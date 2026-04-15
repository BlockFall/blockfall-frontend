import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { celo } from '@reown/appkit/networks';

const projectId = '46cc09a3d487a3c2587df736300bf903';

const metadata = {
  name: 'BlockFall',
  description: 'Stack, clear, survive.',
  url: 'https://blockfall.xyz',
  icons: ['https://blockfall.xyz/favicon.svg'],
};

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [celo],
  metadata,
});

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [celo],
  projectId,
  metadata,
  enableWalletConnect: true,
  features: {
    email: false,
    socials: false,
    emailShowWallets: false,
  },
  allWallets: 'SHOW',
});

export const config = wagmiAdapter.wagmiConfig;
