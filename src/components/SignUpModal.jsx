import { useState, useEffect, useRef } from 'react'
import { COLORS } from '../game/constants'

export default function SignUpModal({ onSubmit, onClose, checkName }) {
  const [name, setName] = useState('')
  const [nameStatus, setNameStatus] = useState(null) // null | 'checking' | 'available' | 'taken' | 'invalid'
  const [submitting, setSubmitting] = useState(false)
  const debounceRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const trimmed = name.trim()
    if (trimmed.length < 3) {
      setNameStatus(trimmed.length > 0 ? 'invalid' : null)
      return
    }
    if (trimmed.length > 20) {
      setNameStatus('invalid')
      return
    }

    setNameStatus('checking')
    debounceRef.current = setTimeout(async () => {
      const available = await checkName(trimmed)
      setNameStatus(available ? 'available' : 'taken')
    }, 400)

    return () => clearTimeout(debounceRef.current)
  }, [name, checkName])

  const canSubmit = nameStatus === 'available' && !submitting

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    await onSubmit(name.trim())
    setSubmitting(false)
  }

  const statusColor =
    nameStatus === 'available' ? '#22c55e' :
    nameStatus === 'taken' ? '#ef4444' :
    nameStatus === 'invalid' ? '#ef4444' :
    nameStatus === 'checking' ? COLORS.amber :
    'transparent'

  const statusText =
    nameStatus === 'available' ? 'Name is available!' :
    nameStatus === 'taken' ? 'Name is already taken' :
    nameStatus === 'invalid' ? 'Name must be 3-20 characters' :
    nameStatus === 'checking' ? 'Checking...' :
    ''

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2, 48, 71, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '32px 28px',
          width: '90%',
          maxWidth: 380,
          boxShadow: '0 20px 60px rgba(2,48,71,0.25)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{
          margin: '0 0 8px',
          fontSize: 22,
          fontWeight: 900,
          color: COLORS.deepSpace,
          textAlign: 'center',
        }}>
          Choose Your Name
        </h2>
        <p style={{
          margin: '0 0 24px',
          fontSize: 13,
          color: COLORS.deepSpace,
          opacity: 0.5,
          textAlign: 'center',
        }}>
          Pick a unique name for the leaderboard
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 14,
                border: `2px solid ${nameStatus ? statusColor : '#e2e8f0'}`,
                outline: 'none',
                color: COLORS.deepSpace,
                background: '#f8fafc',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{
            height: 20,
            fontSize: 12,
            fontWeight: 600,
            color: statusColor,
            marginBottom: 16,
            paddingLeft: 4,
          }}>
            {statusText}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '14px 0',
                fontSize: 15,
                fontWeight: 800,
                borderRadius: 14,
                border: `2px solid ${COLORS.deepSpace}22`,
                background: 'white',
                color: COLORS.deepSpace,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                flex: 1,
                padding: '14px 0',
                fontSize: 15,
                fontWeight: 800,
                borderRadius: 14,
                border: 'none',
                background: canSubmit
                  ? `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`
                  : '#e2e8f0',
                color: canSubmit ? 'white' : '#94a3b8',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {submitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
