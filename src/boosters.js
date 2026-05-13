// Multiplier is in centi-units (125 = 1.25x). Duration in minutes.
export const BOOST_INFO_BY_ITEM_TYPE = {
  201: { multiplier: 125, durationMinutes: 60 },
  202: { multiplier: 125, durationMinutes: 180 },
  203: { multiplier: 125, durationMinutes: 360 },
  204: { multiplier: 150, durationMinutes: 60 },
  205: { multiplier: 150, durationMinutes: 180 },
};

export const BOOSTER_ITEM_TYPES = new Set(
  Object.keys(BOOST_INFO_BY_ITEM_TYPE).map(Number)
);

export function multiplierLabel(centi) {
  return `${(centi / 100).toString()}x`;
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} Minute${minutes === 1 ? '' : 's'}`;
  const hours = minutes / 60;
  return `${hours} Hour${hours === 1 ? '' : 's'}`;
}

export function formatBoosterName(itemType) {
  const info = BOOST_INFO_BY_ITEM_TYPE[itemType];
  if (!info) return null;
  return `${multiplierLabel(info.multiplier)} Score Booster (${formatDuration(info.durationMinutes)})`;
}

// Returns ms remaining (clamped to >= 0) given an ISO timestamp.
export function msRemaining(expiresAtIso, nowMs = Date.now()) {
  if (!expiresAtIso) return 0;
  const end = new Date(expiresAtIso).getTime();
  return Math.max(0, end - nowMs);
}

export function formatCountdown(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}
