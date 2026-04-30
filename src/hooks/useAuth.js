import { useState, useEffect, useCallback } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { useWalletInfo } from '@reown/appkit/react'
import { api, getAuthedApi, tokenKey } from '../api.js'

function isMiniPay() {
  return typeof window !== 'undefined' && !!window.ethereum?.isMiniPay
}

function isMobileBrowser() {
  if (typeof navigator === 'undefined') return false
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

// authStatus: 'loading' | 'no_wallet' | 'signed_in' | 'registered' | 'not_registered'
// - loading: checking wallet/token state
// - no_wallet: wallet not connected
// - signed_in: JWT valid, user data loaded
// - registered: wallet connected, user exists but no valid JWT
// - not_registered: wallet connected, user not registered

export function useAuth() {
  const { address, isConnected, connector } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { walletInfo } = useWalletInfo()
  const [authStatus, setAuthStatus] = useState('loading')
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)

  // Check auth state whenever wallet connection or address changes
  useEffect(() => {
    if (!isConnected || !address) {
      setAuthStatus('no_wallet')
      setUser(null)
      return
    }

    let cancelled = false

    async function checkAuth() {
      setAuthStatus('loading')
      setAuthError(null)

      // First, try existing token for this address
      const token = localStorage.getItem(tokenKey(address))
      if (token) {
        try {
          const authedApi = getAuthedApi(address)
          const res = await authedApi.user.$get()
          if (res.ok) {
            const data = await res.json()
            if (!cancelled) {
              setUser(data)
              setAuthStatus('signed_in')
            }
            return
          }
        } catch {
          // Token invalid, continue to check registration
        }
        // Token invalid — remove it
        localStorage.removeItem(tokenKey(address))
      }

      // No valid token — check if address is registered
      try {
        const res = await api.checkuser.$get({ query: { account: address.toLowerCase() } })
        const data = await res.json()
        if (!cancelled) {
          if (data.registered) {
            setAuthStatus('registered')
          } else {
            setAuthStatus('not_registered')
          }
        }
      } catch {
        if (!cancelled) {
          setAuthStatus('not_registered')
        }
      }
    }

    checkAuth()
    return () => { cancelled = true }
  }, [isConnected, address])

  const signIn = useCallback(async () => {
    if (!walletClient || !address) return
    setAuthError(null)

    try {
      // 1. Get nonce
      const nonceRes = await api.auth.nonce.$get()
      const { nonce } = await nonceRes.json()

      // 2. Build SIWE message
      const message = [
        `${window.location.host} wants you to sign in with your Ethereum account:`,
        address,
        '',
        'Sign in to Blockfall',
        '',
        `URI: ${window.location.origin}`,
        'Version: 1',
        `Chain ID: ${walletClient.chain.id}`,
        `Nonce: ${nonce}`,
        `Issued At: ${new Date().toISOString()}`,
      ].join('\n')

      // 3. Sign
      const signature = await walletClient.signMessage({ account: address, message })

      // 4. Verify
      const verifyRes = await api.auth.verify.$post({ json: { message, signature } })
      if (!verifyRes.ok) {
        const err = await verifyRes.json()
        throw new Error(err.error || 'Verification failed')
      }
      const { token } = await verifyRes.json()

      // 5. Store and fetch user
      localStorage.setItem(tokenKey(address), token)
      const authedApi = getAuthedApi(address)
      const userRes = await authedApi.user.$get()
      const userData = await userRes.json()

      setUser(userData)
      setAuthStatus('signed_in')
    } catch (err) {
      setAuthError(err.message || 'Sign in failed')
    }
  }, [walletClient, address])

  const signUp = useCallback(async (name) => {
    if (!walletClient || !address) return
    setAuthError(null)

    try {
      // 1. Get nonce
      const nonceRes = await api.auth.nonce.$get()
      const { nonce } = await nonceRes.json()

      // 2. Build SIWE message
      const message = [
        `${window.location.host} wants you to sign in with your Ethereum account:`,
        address,
        '',
        'Sign in to Blockfall',
        '',
        `URI: ${window.location.origin}`,
        'Version: 1',
        `Chain ID: ${walletClient.chain.id}`,
        `Nonce: ${nonce}`,
        `Issued At: ${new Date().toISOString()}`,
      ].join('\n')

      // 3. Sign
      const signature = await walletClient.signMessage({ account: address, message })

      // 4. Signup
      const minipay = isMiniPay()
      const user_source = minipay ? 'minipay' : isMobileBrowser() ? 'mobile-web' : 'web'
      let wallet_info
      if (minipay) {
        wallet_info = 'minipay'
      } else {
        const connectorId = connector?.id ?? 'unknown'
        const extra = walletInfo
          ? ` | ${walletInfo.name ?? ''}${walletInfo.type ? ` (${walletInfo.type})` : ''}`.trimEnd()
          : ''
        wallet_info = `${connectorId}${extra}`
      }
      const signupRes = await api.auth.signup.$post({
        json: { message, signature, name, user_source, wallet_info },
      })
      if (!signupRes.ok) {
        const err = await signupRes.json()
        throw new Error(err.error || 'Sign up failed')
      }
      const { token } = await signupRes.json()

      // 5. Store and fetch user
      localStorage.setItem(tokenKey(address), token)
      const authedApi = getAuthedApi(address)
      const userRes = await authedApi.user.$get()
      const userData = await userRes.json()

      setUser(userData)
      setAuthStatus('signed_in')
    } catch (err) {
      setAuthError(err.message || 'Sign up failed')
    }
  }, [walletClient, address, connector, walletInfo])

  const signOut = useCallback(() => {
    if (address) localStorage.removeItem(tokenKey(address))
    setUser(null)
    setAuthStatus(isConnected ? 'registered' : 'no_wallet')
  }, [isConnected, address])

  const checkName = useCallback(async (name) => {
    try {
      const res = await api.auth.checkname.$get({ query: { name } })
      const data = await res.json()
      return data.available
    } catch {
      return false
    }
  }, [])

  const refreshUser = useCallback(async () => {
    if (!address) return null
    const authedApi = getAuthedApi(address)
    if (!authedApi) return null
    try {
      const res = await authedApi.user.$get()
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        return data
      }
    } catch {}
    return null
  }, [address])

  return { authStatus, user, authError, signIn, signUp, signOut, checkName, refreshUser }
}
