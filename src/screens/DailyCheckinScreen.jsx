import { useState } from 'react';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function getCheckins() {
  try {
    return JSON.parse(localStorage.getItem('blockfall_checkins') || '[]');
  } catch {
    return [];
  }
}

function saveCheckins(dates) {
  localStorage.setItem('blockfall_checkins', JSON.stringify(dates));
}

// Returns the ISO date strings for Mon–Sun of the current week
function getCurrentWeekDays() {
  const now = new Date();
  // getDay(): 0=Sun,1=Mon,...,6=Sat
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

// Compute consecutive streak ending today (or yesterday)
function computeStreak(checkins) {
  if (!checkins.length) return 0;
  const set = new Set(checkins);
  let streak = 0;
  const cursor = new Date();
  // Allow streak to count if today is checked in, else start from yesterday
  if (!set.has(todayISO())) cursor.setDate(cursor.getDate() - 1);
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function DailyCheckinScreen({ onGoHome, onAddEnergy }) {
  const [checkins, setCheckins] = useState(getCheckins);

  const today = todayISO();
  const weekDays = getCurrentWeekDays();
  const checkinSet = new Set(checkins);
  const alreadyCheckedIn = checkinSet.has(today);
  const streak = computeStreak(checkins);

  function handleCheckin() {
    if (alreadyCheckedIn) return;
    const updated = [...checkins, today];
    setCheckins(updated);
    saveCheckins(updated);
    onAddEnergy(2);
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

        {/* This week grid */}
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
            This Week
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {weekDays.map((date, i) => {
              const checked = checkinSet.has(date);
              const isToday = date === today;
              const isPast = date < today;
              return (
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
                    {DAY_LABELS[i]}
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
              );
            })}
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
              +2 Energy per check-in
            </div>
            <div style={{ fontSize: 11, color: COLORS.deepSpace, opacity: 0.55 }}>
              Check in daily to keep your streak and earn energy
            </div>
          </div>
        </div>

        {/* Check-in button */}
        <button
          onClick={handleCheckin}
          disabled={alreadyCheckedIn}
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
            cursor: alreadyCheckedIn ? 'not-allowed' : 'pointer',
            letterSpacing: 1,
            boxShadow: alreadyCheckedIn ? 'none' : `0 8px 24px ${COLORS.blueGreen}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {alreadyCheckedIn ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke={COLORS.blueGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Checked In Today
            </>
          ) : (
            <>
              <span>📅</span>
              Check In Now (+2 ⚡)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
