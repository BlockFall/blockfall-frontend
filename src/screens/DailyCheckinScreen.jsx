import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';
import { getAuthedApi } from '../api';

const CYCLE_LENGTH = 7;

function todayUTCISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysUTC(isoDate, delta) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

// Walk back from today (or yesterday if today missing) to count consecutive check-ins.
function computeStreak(checkinSet, today) {
  let cursor = today;
  if (!checkinSet.has(cursor)) cursor = addDaysUTC(cursor, -1);
  let streak = 0;
  while (checkinSet.has(cursor)) {
    streak++;
    cursor = addDaysUTC(cursor, -1);
  }
  return streak;
}

// Build the 7-slot cycle ending at/including today, based on current streak progress.
function buildCycle(checkinSet, today) {
  const todayChecked = checkinSet.has(today);
  const streak = computeStreak(checkinSet, today);
  // position of "today" within the current 7-day cycle (1..7)
  const positionToday = todayChecked
    ? ((streak - 1) % CYCLE_LENGTH) + 1
    : (streak % CYCLE_LENGTH) + 1;
  const cycleStart = addDaysUTC(today, -(positionToday - 1));
  const days = Array.from({ length: CYCLE_LENGTH }, (_, i) => {
    const date = addDaysUTC(cycleStart, i);
    return {
      date,
      checked: checkinSet.has(date),
      isToday: date === today,
      isPast: date < today,
    };
  });
  return { days, streak, positionToday };
}

export default function DailyCheckinScreen({ onGoHome, onAddEnergy }) {
  const { address } = useAccount();
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [rewardMsg, setRewardMsg] = useState(null);

  const fetchCheckins = useCallback(async () => {
    const authedApi = getAuthedApi(address);
    if (!authedApi) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      const res = await authedApi.checkin.$get();
      if (!res.ok) {
        setError('Failed to load check-ins');
        return;
      }
      const data = await res.json();
      setDays(data.days || []);
      setError(null);
    } catch {
      setError('Failed to load check-ins');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchCheckins();
  }, [fetchCheckins]);

  const today = todayUTCISO();
  const checkinSet = new Set(days.filter((d) => d.checked_in).map((d) => d.date));
  const alreadyCheckedIn = checkinSet.has(today);
  const { days: cycleDays, streak, positionToday } = buildCycle(checkinSet, today);

  async function handleCheckin() {
    if (alreadyCheckedIn || submitting) return;
    const authedApi = getAuthedApi(address);
    if (!authedApi) {
      setError('Not authenticated');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await authedApi.checkin.$post();
      if (!res.ok) {
        if (res.status === 409) {
          await fetchCheckins();
        } else {
          setError('Check-in failed');
        }
        return;
      }
      const data = await res.json();
      if (data.mystery_box_item_id) {
        setRewardMsg(`🎁 Mystery box unlocked! (+${data.energy_granted} ⚡)`);
      } else {
        setRewardMsg(`+${data.energy_granted} ⚡ granted!`);
      }
      await fetchCheckins();
      onAddEnergy?.(data.energy_granted);
    } catch {
      setError('Check-in failed');
    } finally {
      setSubmitting(false);
    }
  }

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
        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Daily Check-in</span>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Streak banner */}
        <div
          style={{
            background: streak > 0
              ? `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.amber})`
              : 'white',
            borderRadius: 18,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: streak > 0 ? `0 6px 24px ${COLORS.orange}44` : '0 2px 10px rgba(2,48,71,0.07)',
            border: streak > 0 ? 'none' : `2px solid ${COLORS.skyBlue}55`,
          }}
        >
          <span style={{ fontSize: 40 }}>{streak > 0 ? '🔥' : '💤'}</span>
          <div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: streak > 0 ? 'white' : COLORS.deepSpace,
                lineHeight: 1,
              }}
            >
              {streak} day{streak !== 1 ? 's' : ''}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: streak > 0 ? 'rgba(255,255,255,0.85)' : COLORS.deepSpace,
                opacity: streak > 0 ? 1 : 0.5,
              }}
            >
              {streak > 0 ? 'consecutive streak' : 'No streak yet — check in today!'}
            </div>
          </div>
        </div>

        {/* 7-day cycle grid */}
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: '18px 16px',
            boxShadow: '0 2px 10px rgba(2,48,71,0.07)',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.deepSpace,
              opacity: 0.6,
              marginBottom: 14,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            7-Day Streak ({positionToday}/{CYCLE_LENGTH})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {cycleDays.map(({ date, checked, isToday, isPast }, i) => (
              <div
                key={date}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: isToday ? COLORS.orange : COLORS.deepSpace,
                    opacity: isToday ? 1 : 0.5,
                    letterSpacing: 0.3,
                  }}
                >
                  {`Day ${i + 1}`}
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: checked
                      ? `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.brightMarine})`
                      : isToday
                      ? `${COLORS.orange}22`
                      : isPast
                      ? `${COLORS.deepSpace}0d`
                      : `${COLORS.skyBlue}22`,
                    border: isToday
                      ? `2px solid ${checked ? COLORS.blueGreen : COLORS.orange}`
                      : '2px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: checked ? `0 3px 10px ${COLORS.blueGreen}44` : 'none',
                  }}
                >
                  {checked ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : isPast ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke={COLORS.deepSpace}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeOpacity="0.3"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reward info */}
        <div
          style={{
            background: `${COLORS.amber}18`,
            border: `1.5px solid ${COLORS.amber}44`,
            borderRadius: 14,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.deepSpace }}>
              Energy per check-in + mystery box every 7 days
            </div>
            <div style={{ fontSize: 11, color: COLORS.deepSpace, opacity: 0.55 }}>
              Check in daily to keep your streak going
            </div>
          </div>
        </div>

        {rewardMsg && (
          <div
            style={{
              background: `${COLORS.blueGreen}22`,
              border: `1.5px solid ${COLORS.blueGreen}66`,
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.deepSpace,
            }}
          >
            {rewardMsg}
          </div>
        )}

        {error && (
          <div
            style={{
              background: '#ff4d4d22',
              border: '1.5px solid #ff4d4d66',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 13,
              fontWeight: 700,
              color: '#b00020',
            }}
          >
            {error}
          </div>
        )}

        {/* Check-in button */}
        <button
          onClick={handleCheckin}
          disabled={alreadyCheckedIn || submitting || loading}
          style={{
            background: alreadyCheckedIn
              ? `${COLORS.blueGreen}44`
              : `linear-gradient(135deg, ${COLORS.blueGreen}, ${COLORS.brightMarine})`,
            color: alreadyCheckedIn ? COLORS.blueGreen : 'white',
            border: 'none',
            borderRadius: 18,
            padding: '18px',
            fontSize: 16,
            fontWeight: 800,
            cursor: alreadyCheckedIn || submitting || loading ? 'not-allowed' : 'pointer',
            opacity: submitting || loading ? 0.7 : 1,
            letterSpacing: 1,
            boxShadow: alreadyCheckedIn ? 'none' : `0 8px 24px ${COLORS.blueGreen}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {loading ? (
            'Loading…'
          ) : alreadyCheckedIn ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke={COLORS.blueGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Checked In Today
            </>
          ) : submitting ? (
            'Checking in…'
          ) : (
            <>
              <span>📅</span>
              Check In Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
