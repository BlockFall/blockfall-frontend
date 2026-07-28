#!/usr/bin/env node
// Checks that a Celo transaction carries the BlockFall ERC-8021 attribution tag.
//
//   npm run verify:attribution -- 0x<tx hash>
//
// The expected tag is read from .env.local / .env (VITE_CELO_ATTRIBUTION_TAG).

import { readFileSync } from 'node:fs';
import { verifyTx } from '@celo/attribution-tags';
import { createPublicClient, http } from 'viem';
import { celo } from 'viem/chains';

const RPC_URL = process.env.CELO_RPC_URL || 'https://forno.celo.org';

function readEnvTag() {
  if (process.env.VITE_CELO_ATTRIBUTION_TAG) return process.env.VITE_CELO_ATTRIBUTION_TAG;
  for (const file of ['.env.local', '.env']) {
    try {
      const match = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
        .match(/^\s*VITE_CELO_ATTRIBUTION_TAG\s*=\s*(.+?)\s*$/m);
      if (match) return match[1].replace(/^["']|["']$/g, '');
    } catch {
      // file not present, try the next one
    }
  }
  return null;
}

const hash = process.argv[2];
if (!/^0x[0-9a-fA-F]{64}$/.test(hash || '')) {
  console.error('Usage: npm run verify:attribution -- 0x<tx hash>');
  process.exit(2);
}

const expected = readEnvTag();
if (!expected) {
  console.error('VITE_CELO_ATTRIBUTION_TAG is not set in .env.local, .env, or the environment.');
  process.exit(2);
}

const client = createPublicClient({ chain: celo, transport: http(RPC_URL) });
const result = await verifyTx({ client, hash });

if (!result) {
  console.error(`FAIL  ${hash}`);
  console.error('      No ERC-8021 attribution suffix found in this transaction.');
  console.error('      Either the tx predates the change, or the wallet stripped the trailing calldata.');
  process.exit(1);
}

console.log(`Decoded codes: ${result.codes.join(', ')}  (schemaId ${result.schemaId})`);

if (result.codes.includes(expected)) {
  console.log(`PASS  ${hash} is attributed to ${expected}`);
} else {
  console.error(`FAIL  expected ${expected}, but the tx carries ${result.codes.join(', ')}`);
  process.exit(1);
}
