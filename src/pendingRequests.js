import { getAuthedApi } from './api'

const MAX_ATTEMPTS = 3

function storageKey(address) {
  return `blockfall_pending_${address.toLowerCase()}`
}

function readQueue(address) {
  if (!address) return []
  try {
    const raw = localStorage.getItem(storageKey(address))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeQueue(address, queue) {
  if (!address) return
  const key = storageKey(address)
  if (queue.length === 0) localStorage.removeItem(key)
  else localStorage.setItem(key, JSON.stringify(queue))
}

function genId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function enqueue(address, kind, payload) {
  const id = genId()
  const queue = readQueue(address)
  queue.push({ id, kind, payload, attempts: 0 })
  writeQueue(address, queue)
  return id
}

async function attemptItem(authedApi, item) {
  let res
  try {
    if (item.kind === 'game_end') {
      res = await authedApi.game.end.$post({ json: item.payload })
    } else if (item.kind === 'purchase_submit') {
      res = await authedApi.purchase.submit.$post({ json: item.payload })
    } else {
      return true
    }
  } catch (err) {
    console.error(`pendingRequests: ${item.kind} threw`, err)
    return false
  }
  if (!res.ok) {
    let body
    try { body = await res.text() } catch { body = '<unreadable>' }
    console.error(`pendingRequests: ${item.kind} failed with ${res.status}`, body)
  }
  return res.ok
}

const inflight = new Map()

function processQueueOnce(address) {
  if (!address) return Promise.resolve({})
  const existing = inflight.get(address)
  if (existing) return existing

  const promise = (async () => {
    const authedApi = getAuthedApi(address)
    if (!authedApi) return {}

    const queue = readQueue(address)
    const remaining = []
    const results = {}

    for (const item of queue) {
      const succeeded = await attemptItem(authedApi, item)
      results[item.id] = succeeded
      const newAttempts = item.attempts + 1
      if (!succeeded && newAttempts < MAX_ATTEMPTS) {
        remaining.push({ ...item, attempts: newAttempts })
      }
    }
    writeQueue(address, remaining)
    return results
  })()

  inflight.set(address, promise)
  promise.finally(() => inflight.delete(address))
  return promise
}

export function processPendingRequests(address) {
  return processQueueOnce(address)
}

export async function submitWithRetry(address, kind, payload) {
  if (!address) return false
  const id = enqueue(address, kind, payload)
  let lastAttempts = -1
  while (true) {
    const results = await processQueueOnce(address)
    if (results[id] === true) return true
    const item = readQueue(address).find((it) => it.id === id)
    if (!item) return false
    if (item.attempts === lastAttempts) return false
    lastAttempts = item.attempts
    await new Promise((r) => setTimeout(r, 1000 * item.attempts))
  }
}
