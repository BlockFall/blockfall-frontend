import { hc } from 'hono/client'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

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
