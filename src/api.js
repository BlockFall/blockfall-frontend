import { hc } from 'hono/client'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const api = hc(API_BASE)

export function getAuthedApi() {
  const token = localStorage.getItem('blockfall_token')
  if (!token) return null
  return hc(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
