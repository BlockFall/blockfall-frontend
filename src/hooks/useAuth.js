import { useState, useEffect, useCallback } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { api, getAuthedApi } from '../api.js'

// authStatus: 'loading' | 'no_wallet' | 'signed_in' | 'registered' | 'not_registered'
// - loading: checking wallet/token state
// - no_wallet: wallet not connected
// - signed_in: JWT valid, user data loaded
// - registered: wallet connected, user exists but no valid JWT
// - not_registered: wallet connected, user not registered

export function useAuth() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
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

      // First, try existing token
      const token = localStorage.getItem('blockfall_token')
      if (token) {
        try {
          const authedApi = getAuthedApi()
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
        localStorage.removeItem('blockfall_token')
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
      localStorage.setItem('blockfall_token', token)
      const authedApi = getAuthedApi()
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
      const signupRes = await api.auth.signup.$post({ json: { message, signature, name } })
      if (!signupRes.ok) {
        const err = await signupRes.json()
        throw new Error(err.error || 'Sign up failed')
      }
      const { token } = await signupRes.json()

      // 5. Store and fetch user
      localStorage.setItem('blockfall_token', token)
      const authedApi = getAuthedApi()
      const userRes = await authedApi.user.$get()
      const userData = await userRes.json()

      setUser(userData)
      setAuthStatus('signed_in')
    } catch (err) {
      setAuthError(err.message || 'Sign up failed')
    }
  }, [walletClient, address])

  const signOut = useCallback(() => {
    localStorage.removeItem('blockfall_token')
    setUser(null)
    setAuthStatus(isConnected ? 'registered' : 'no_wallet')
  }, [isConnected])

  const checkName = useCallback(async (name) => {
    try {
      const res = await api.auth.checkname.$get({ query: { name } })
      const data = await res.json()
      return data.available
    } catch {
      return false
    }
  }, [])

  return { authStatus, user, authError, signIn, signUp, signOut, checkName }
}
