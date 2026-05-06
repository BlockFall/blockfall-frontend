import { hc } from 'hono/client'

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.blockfall.xyz/'
const GAME_EVENTS_ENABLED = import.meta.env.VITE_GAME_EVENTS_ENABLED !== 'false'

export const api = hc(API_BASE)

export function tokenKey(address) {
  return `blockfall_token_${address.toLowerCase()}`
}

export function getAuthedApi(address) {
  if (!address) return null
  const token = localStorage.getItem(tokenKey(address))
  if (!token) return null
  return hc(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function sendGameEvent(address, gamePlayId, event_type, extras = {}) {
  if (!GAME_EVENTS_ENABLED) return
  if (!address || !gamePlayId) return
  const authedApi = getAuthedApi(address)
  if (!authedApi) return
  authedApi.game.event.$post({ json: { game_play_id: gamePlayId, event_type, ...extras } }).catch(() => {})
}
