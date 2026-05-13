import { useState, useEffect, useCallback } from 'react';
import { formatUnits } from 'viem';
import { usePublicClient } from 'wagmi';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';
import { getAuthedApi } from '../api';
import { PAYMENT_TOKENS } from '../constants';
import erc20Abi from '../abis/erc20.abi.js';
import { useClaim } from '../hooks/useClaim';
import { TxOverlay, Toast } from '../components/TxOverlay';
import SignUpModal from '../components/SignUpModal';
import {
  BOOST_INFO_BY_ITEM_TYPE,
  BOOSTER_ITEM_TYPES,
  formatBoosterName,
  formatDuration,
  multiplierLabel,
} from '../boosters';

const MYSTERY_BOX_ITEM_TYPE = 101;

function getItemTypeInfo(itemType) {
  if (itemType === MYSTERY_BOX_ITEM_TYPE) {
    return { name: 'Mystery Box', icon: '🎁' };
  }
  const boosterName = formatBoosterName(itemType);
  if (boosterName) {
    return { name: boosterName, icon: '✨' };
  }
  return { name: `Item #${itemType}`, icon: '📦' };
}

const PAYOUT_TYPE_LABELS = {
  checkin: { name: 'Daily Check-in', icon: '📅' },
  game: { name: 'Game Reward', icon: '🎮' },
  mystery_box: { name: 'Mystery Box Reward', icon: '💵' },
};

export default function ProfileScreen({ audio, onToggleMute, onGoHome, address, checkName, onRename }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejectedToast, setShowRejectedToast] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [openingBoxId, setOpeningBoxId] = useState(null);
  const [openResult, setOpenResult] = useState(null);
  const [openError, setOpenError] = useState(null);
  const [activatingId, setActivatingId] = useState(null);
  const [activationResult, setActivationResult] = useState(null);
  const [activationError, setActivationError] = useState(null);
  const [showActiveWarning, setShowActiveWarning] = useState(false);
  const publicClient = usePublicClient();
  const { claim, txStatus, claimingId, resetTxStatus } = useClaim();

  const fetchProfile = useCallback(async () => {
    const authedApi = getAuthedApi(address);
    if (!authedApi) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      const res = await authedApi.user.$get();
      if (!res.ok) {
        setError('Failed to load profile');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProfile(data);
    } catch {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (txStatus === 'rejected') {
      setShowRejectedToast(true);
      resetTxStatus();
    }
    if (txStatus === 'success') {
      fetchProfile();
      resetTxStatus();
    }
  }, [txStatus, resetTxStatus, fetchProfile]);

  const handleClaim = useCallback(
    (pendingClaim) => claim(pendingClaim),
    [claim]
  );

  const handleOpenBox = useCallback(async (itemId) => {
    if (openingBoxId) return;
    const authedApi = getAuthedApi(address);
    if (!authedApi) return;
    setOpenError(null);
    setOpeningBoxId(itemId);
    try {
      const res = await authedApi['mystery-box'].open.$post({ json: { item_id: itemId } });
      if (!res.ok) {
        setOpenError('Failed to open. Try again.');
        setOpeningBoxId(null);
        return;
      }
      const data = await res.json();
      setOpenResult(data);
    } catch {
      setOpenError('Failed to open. Try again.');
      setOpeningBoxId(null);
    }
  }, [address, openingBoxId]);

  const handleCloseOpenOverlay = useCallback(() => {
    setOpeningBoxId(null);
    setOpenResult(null);
    setOpenError(null);
    fetchProfile();
  }, [fetchProfile]);

  const handleActivateBooster = useCallback(async (itemId) => {
    if (activatingId) return;
    if (profile?.active_booster) {
      setShowActiveWarning(true);
      return;
    }
    const authedApi = getAuthedApi(address);
    if (!authedApi) return;
    setActivationError(null);
    setActivatingId(itemId);
    try {
      const res = await authedApi.booster.activate.$post({ json: { item_id: itemId } });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setActivationError(data?.error || 'Failed to activate. Try again.');
        return;
      }
      const data = await res.json();
      setActivationResult(data);
    } catch {
      setActivationError('Failed to activate. Try again.');
    } finally {
      setActivatingId(null);
    }
  }, [address, activatingId, profile]);

  const handleCloseActivation = useCallback(() => {
    setActivationResult(null);
    setActivationError(null);
    fetchProfile();
  }, [fetchProfile]);

  const handleRenameSubmit = useCallback(async (name) => {
    const ok = await onRename(name);
    if (ok) {
      setShowRenameModal(false);
      fetchProfile();
    }
  }, [onRename, fetchProfile]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(2,48,71,0.08)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <BackButton onGoHome={onGoHome} />
        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Profile</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={onToggleMute}
          title={audio.muted ? 'Unmute' : 'Mute'}
          style={{
            background: COLORS.skyBlue + '33',
            border: 'none',
            borderRadius: 12,
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.deepSpace,
          }}
        >
          {audio.muted
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
          }
          {audio.muted ? 'Unmuted' : 'Sound On'}
        </button>
      </div>

      {loading && (
        <div style={{ padding: 40, textAlign: 'center', color: COLORS.deepSpace, opacity: 0.5 }}>
          Loading...
        </div>
      )}

      {error && (
        <div style={{ padding: 40, textAlign: 'center', color: '#e74c3c' }}>
          {error}
        </div>
      )}

      {profile && (
        <>
          {/* Avatar + name */}
          <div style={{ padding: '28px 20px 0', textAlign: 'center' }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
                margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36,
                boxShadow: `0 8px 24px ${COLORS.blueGreen}55`,
              }}
            >
              🎮
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.deepSpace }}>{profile.name}</div>
              <button
                onClick={() => setShowRenameModal(true)}
                title="Edit name"
                style={{
                  background: COLORS.skyBlue + '33',
                  border: 'none',
                  borderRadius: 10,
                  padding: 8,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.deepSpace} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ padding: '24px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <StatBlock label="Today's Score" value={profile.stats.today_score.toLocaleString()} color={COLORS.blueGreen} icon="📅" />
            <StatBlock label="Total Score" value={Number(profile.stats.total_score).toLocaleString()} color={COLORS.orange} icon="🏅" />
            <StatBlock label="Best Score" value={profile.stats.best_score.toLocaleString()} color={COLORS.amber} icon="🏆" />
            <StatBlock label="Games Played" value={profile.stats.games_played} color={COLORS.deepSpace} icon="🎮" />
          </div>

          {/* Pending Claims */}
          {profile.pending_claims && profile.pending_claims.length > 0 && (
            <div style={{ padding: '24px 16px 0' }}>
              <div
                style={{
                  fontSize: 16, fontWeight: 800, color: COLORS.deepSpace,
                  marginBottom: 12,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span>💰</span> Pending Claims
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.pending_claims.map((c) => (
                  <PendingClaimCard
                    key={c.payout_id}
                    claim={c}
                    publicClient={publicClient}
                    onClaim={handleClaim}
                    isClaiming={claimingId === c.payout_id}
                    disabled={claimingId != null && claimingId !== c.payout_id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Inventory */}
          <div style={{ padding: '24px 16px 0' }}>
            <div
              style={{
                fontSize: 16, fontWeight: 800, color: COLORS.deepSpace,
                marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span>🎒</span> Inventory
            </div>
            {profile.inventory.length === 0 ? (
              <div
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '24px 16px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(2,48,71,0.06)',
                  color: COLORS.deepSpace,
                  opacity: 0.5,
                  fontSize: 14,
                }}
              >
                No items yet. Buy a Mystery Box from the Shop!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.inventory.map(item => (
                  <InventoryCard
                    key={item.item_id}
                    item={item}
                    onOpen={item.item_type === MYSTERY_BOX_ITEM_TYPE ? () => handleOpenBox(item.item_id) : null}
                    isOpening={openingBoxId === item.item_id}
                    onActivate={BOOSTER_ITEM_TYPES.has(item.item_type) ? () => handleActivateBooster(item.item_id) : null}
                    isActivating={activatingId === item.item_id}
                    disabled={(openingBoxId != null && openingBoxId !== item.item_id) || (activatingId != null && activatingId !== item.item_id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={{ height: 24 }} />
        </>
      )}

      <TxOverlay txStatus={txStatus} onClose={resetTxStatus} />
      {openingBoxId && (
        <MysteryBoxOpenOverlay
          result={openResult}
          error={openError}
          onClose={handleCloseOpenOverlay}
        />
      )}
      {(activatingId || activationResult || activationError) && (
        <BoosterActivationOverlay
          loading={!!activatingId && !activationResult && !activationError}
          result={activationResult}
          error={activationError}
          onClose={handleCloseActivation}
        />
      )}
      {showActiveWarning && (
        <ActiveBoosterWarning
          activeBooster={profile?.active_booster}
          onClose={() => setShowActiveWarning(false)}
        />
      )}
      {showRejectedToast && (
        <Toast message="You have rejected" onDone={() => setShowRejectedToast(false)} />
      )}
      {showRenameModal && profile && (
        <SignUpModal
          onSubmit={handleRenameSubmit}
          onClose={() => setShowRenameModal(false)}
          checkName={checkName}
          title="Change Your Name"
          subtitle="Pick a new unique name for the leaderboard"
          submitLabel="Save"
          submittingLabel="Saving..."
          currentName={profile.name}
        />
      )}
    </div>
  );
}

function PendingClaimCard({ claim, publicClient, onClaim, isClaiming, disabled }) {
  const [decimals, setDecimals] = useState(null);
  const tokenInfo = PAYMENT_TOKENS[claim.payment_token];
  const payoutInfo = PAYOUT_TYPE_LABELS[claim.payout_type] || { name: 'Reward', icon: '💵' };

  useEffect(() => {
    let cancelled = false;
    if (!publicClient || !tokenInfo) return;
    publicClient
      .readContract({
        address: tokenInfo.address,
        abi: erc20Abi,
        functionName: 'decimals',
      })
      .then((d) => {
        if (!cancelled) setDecimals(Number(d));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [publicClient, tokenInfo]);

  const formattedAmount =
    decimals != null ? formatUnits(BigInt(claim.amount), decimals) : null;

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 14,
        padding: '14px 16px',
        boxShadow: '0 2px 10px rgba(2,48,71,0.06)',
        border: `2px solid ${COLORS.blueGreen}33`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ fontSize: 28 }}>{payoutInfo.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.deepSpace }}>
          {payoutInfo.name}
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.blueGreen }}>
          {formattedAmount ?? '…'} {tokenInfo?.symbol ?? '?'}
        </div>
      </div>
      <button
        onClick={() => onClaim(claim)}
        disabled={disabled || isClaiming || !tokenInfo}
        style={{
          background:
            disabled || isClaiming
              ? '#cbd5e1'
              : `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
          color: 'white',
          border: 'none',
          borderRadius: 10,
          padding: '10px 18px',
          fontSize: 14,
          fontWeight: 800,
          cursor: disabled || isClaiming ? 'not-allowed' : 'pointer',
          boxShadow: `0 4px 12px ${COLORS.blueGreen}44`,
        }}
      >
        {isClaiming ? 'Claiming…' : 'Claim'}
      </button>
    </div>
  );
}

function StatBlock({ label, value, color, icon }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '16px',
        boxShadow: '0 2px 10px rgba(2,48,71,0.06)',
        border: `2px solid ${color}22`,
      }}
    >
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.deepSpace }}>
        {value || '—'}
      </div>
      <div style={{ fontSize: 11, color: color, fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </div>
    </div>
  );
}

function InventoryCard({ item, onOpen, isOpening, onActivate, isActivating, disabled }) {
  const info = getItemTypeInfo(item.item_type);
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 14,
        padding: '14px 16px',
        boxShadow: '0 2px 10px rgba(2,48,71,0.06)',
        border: `2px solid ${COLORS.amber}33`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ fontSize: 28 }}>{info.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.deepSpace }}>
          {info.name}
        </div>
        <div style={{ fontSize: 11, color: COLORS.deepSpace, opacity: 0.55 }}>
          {item.acquisition_type === 'purchase' ? 'Purchased' : item.acquisition_type}
          {item.acquisition_date && ` · ${new Date(item.acquisition_date).toLocaleDateString()}`}
        </div>
      </div>
      {onOpen && (
        <button
          onClick={onOpen}
          disabled={disabled || isOpening}
          style={{
            background:
              disabled || isOpening
                ? '#cbd5e1'
                : `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`,
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 800,
            cursor: disabled || isOpening ? 'not-allowed' : 'pointer',
            boxShadow: `0 4px 12px ${COLORS.orange}44`,
          }}
        >
          {isOpening ? 'Opening…' : 'Open'}
        </button>
      )}
      {onActivate && (
        <button
          onClick={onActivate}
          disabled={disabled || isActivating}
          style={{
            background:
              disabled || isActivating
                ? '#cbd5e1'
                : `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 800,
            cursor: disabled || isActivating ? 'not-allowed' : 'pointer',
            boxShadow: `0 4px 12px ${COLORS.blueGreen}44`,
          }}
        >
          {isActivating ? 'Activating…' : 'Activate'}
        </button>
      )}
    </div>
  );
}

function BoosterActivationOverlay({ loading, result, error, onClose }) {
  const multiplier = result?.multiplier;
  const startedAt = result?.started_at;
  const expiresAt = result?.expires_at;
  const durationMinutes = startedAt && expiresAt
    ? Math.max(1, Math.round((new Date(expiresAt).getTime() - new Date(startedAt).getTime()) / 60000))
    : null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2,48,71,0.65)',
        backdropFilter: 'blur(6px)',
        animation: 'mboxFade 0.2s ease',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          minWidth: 300,
          maxWidth: 360,
          boxShadow: '0 24px 64px rgba(2,48,71,0.3)',
          textAlign: 'center',
        }}
      >
        {error ? (
          <>
            <div style={{ fontSize: 48 }}>⚠️</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.deepSpace }}>{error}</div>
            <button
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </>
        ) : loading || !result ? (
          <>
            <div
              style={{
                position: 'relative',
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 72,
                animation: 'boosterMagic 0.9s ease forwards',
                filter: `drop-shadow(0 0 16px ${COLORS.skyBlue})`,
              }}
            >
              ✨
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.deepSpace }}>
              Activating booster…
            </div>
          </>
        ) : (
          <>
            <div style={{ position: 'relative', width: 140, height: 140 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${COLORS.skyBlue}aa 0%, ${COLORS.blueGreen}55 45%, transparent 70%)`,
                  animation: 'energyBurst 0.6s ease forwards',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 84,
                  animation: 'boosterMagic 0.9s ease forwards',
                  filter: `drop-shadow(0 0 16px ${COLORS.skyBlue})`,
                }}
              >
                🚀
              </div>
              {[
                { top: '8%', left: '12%' },
                { top: '18%', right: '10%' },
                { bottom: '14%', left: '8%' },
                { bottom: '8%', right: '14%' },
                { top: '50%', left: '0%' },
                { top: '45%', right: '0%' },
              ].map((p, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...p,
                    fontSize: 16,
                    animation: `sparkle 1.2s ease ${i * 0.12}s infinite`,
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.blueGreen }}>
              {multiplier ? multiplierLabel(multiplier) : ''} Booster Activated!
            </div>
            <div style={{ fontSize: 14, color: COLORS.deepSpace, opacity: 0.75, lineHeight: 1.4 }}>
              {multiplier ? multiplierLabel(multiplier) : ''} booster is enabled
              {durationMinutes ? ` for ${formatDuration(durationMinutes)}` : ''}.
            </div>
            <button
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 32px',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: `0 6px 18px ${COLORS.blueGreen}55`,
              }}
            >
              Awesome!
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ActiveBoosterWarning({ activeBooster, onClose }) {
  const mult = activeBooster?.multiplier;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 960,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2,48,71,0.65)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          minWidth: 280,
          maxWidth: 340,
          boxShadow: '0 24px 64px rgba(2,48,71,0.3)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 44 }}>⚠️</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.deepSpace }}>
          You already have an active booster
        </div>
        <div style={{ fontSize: 14, color: COLORS.deepSpace, opacity: 0.65, lineHeight: 1.4 }}>
          Wait for your {mult ? multiplierLabel(mult) : 'current'} booster to expire before activating another.
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: 4,
            background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '12px 32px',
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function MysteryBoxOpenOverlay({ result, error, onClose }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => setRevealed(true), 1400);
    return () => clearTimeout(t);
  }, [result]);

  const isEnergy = result && (result.energy_granted ?? 0) > 0;
  const isBooster = result && !isEnergy && BOOSTER_ITEM_TYPES.has(result.prize_item_type);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2,48,71,0.65)',
        backdropFilter: 'blur(6px)',
        animation: 'mboxFade 0.2s ease',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '36px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          minWidth: 300,
          maxWidth: 360,
          boxShadow: '0 24px 64px rgba(2,48,71,0.3)',
          textAlign: 'center',
        }}
      >
        {error ? (
          <>
            <div style={{ fontSize: 48 }}>⚠️</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.deepSpace }}>{error}</div>
            <button
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </>
        ) : !revealed ? (
          <>
            <div
              style={{
                fontSize: 96,
                animation: 'mboxShake 0.45s ease-in-out infinite',
                filter: 'drop-shadow(0 8px 24px rgba(251,133,0,0.55))',
              }}
            >
              🎁
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.deepSpace }}>
              Opening Mystery Box…
            </div>
          </>
        ) : isEnergy ? (
          <EnergyReveal amount={result.energy_granted} onClose={onClose} />
        ) : isBooster ? (
          <BoosterReveal itemType={result.prize_item_type} onClose={onClose} />
        ) : (
          <>
            <div style={{ fontSize: 64 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.deepSpace }}>
              You got a prize!
            </div>
            <button
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Awesome!
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes mboxFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mboxShake {
          0%, 100% { transform: rotate(-10deg) scale(1); }
          25%      { transform: rotate(10deg) scale(1.05); }
          50%      { transform: rotate(-8deg) scale(1.08); }
          75%      { transform: rotate(8deg) scale(1.05); }
        }
        @keyframes energyBurst {
          0%   { transform: scale(0.4); opacity: 0; }
          50%  { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes energyBoltSpin {
          0%   { transform: rotate(-15deg) scale(0.8); filter: drop-shadow(0 0 0 #fbbf24); }
          50%  { transform: rotate(15deg)  scale(1.2); filter: drop-shadow(0 0 28px #fbbf24); }
          100% { transform: rotate(0deg)   scale(1);   filter: drop-shadow(0 0 14px #fbbf24); }
        }
        @keyframes boosterMagic {
          0%   { transform: rotate(-180deg) scale(0.4); opacity: 0; }
          50%  { transform: rotate(0deg) scale(1.3); opacity: 1; }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50%      { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function EnergyReveal({ amount, onClose }) {
  return (
    <>
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fde68a 0%, #fbbf24 45%, transparent 70%)',
            animation: 'energyBurst 0.6s ease forwards',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 84,
            animation: 'energyBoltSpin 0.7s ease forwards',
          }}
        >
          ⚡
        </div>
        {['10%','85%','15%','80%'].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i < 2 ? pos : 'auto',
              bottom: i >= 2 ? pos : 'auto',
              left: i % 2 === 0 ? '5%' : '85%',
              fontSize: 18,
              animation: `sparkle 1.2s ease ${i * 0.15}s infinite`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.orange }}>
        +{amount} Energy
      </div>
      <div style={{ fontSize: 13, color: COLORS.deepSpace, opacity: 0.65 }}>
        Energy added to your account
      </div>
      <button
        onClick={onClose}
        style={{
          background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`,
          color: 'white',
          border: 'none',
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: 15,
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: `0 6px 18px ${COLORS.orange}55`,
        }}
      >
        Awesome!
      </button>
    </>
  );
}

function BoosterReveal({ itemType, onClose }) {
  const boosterName = formatBoosterName(itemType) || 'Score Booster';
  return (
    <>
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.skyBlue}aa 0%, ${COLORS.blueGreen}55 45%, transparent 70%)`,
            animation: 'energyBurst 0.6s ease forwards',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 84,
            animation: 'boosterMagic 0.9s ease forwards',
            filter: `drop-shadow(0 0 16px ${COLORS.skyBlue})`,
          }}
        >
          ✨
        </div>
        {[
          { top: '8%', left: '12%' },
          { top: '18%', right: '10%' },
          { bottom: '14%', left: '8%' },
          { bottom: '8%', right: '14%' },
          { top: '50%', left: '0%' },
          { top: '45%', right: '0%' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...p,
              fontSize: 16,
              animation: `sparkle 1.2s ease ${i * 0.12}s infinite`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
      <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.blueGreen }}>
        {boosterName}
      </div>
      <div style={{ fontSize: 13, color: COLORS.deepSpace, opacity: 0.65 }}>
        Booster unlocked — multiplies your score
      </div>
      <button
        onClick={onClose}
        style={{
          background: `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.deepSpace})`,
          color: 'white',
          border: 'none',
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: 15,
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: `0 6px 18px ${COLORS.blueGreen}55`,
        }}
      >
        Awesome!
      </button>
    </>
  );
}
