import { toDataSuffix } from '@celo/attribution-tags';

// ERC-8021 attribution suffix appended to the calldata of every transaction the
// app sends, so Celo can credit the on-chain activity to BlockFall. The EVM
// discards trailing calldata, so this never changes what a transaction does.
const TAG = import.meta.env.VITE_CELO_ATTRIBUTION_TAG;

function buildSuffix() {
  if (!TAG) {
    console.warn('[attribution] VITE_CELO_ATTRIBUTION_TAG is not set, transactions will be untagged');
    return undefined;
  }
  try {
    return toDataSuffix(TAG);
  } catch (err) {
    console.warn('[attribution] invalid VITE_CELO_ATTRIBUTION_TAG, transactions will be untagged', err);
    return undefined;
  }
}

// undefined when unset/invalid, which makes `dataSuffix` a no-op for wagmi.
export const ATTRIBUTION_SUFFIX = buildSuffix();
