import { useState } from 'react';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';
import { UserRejectedRequestError } from 'viem';
import erc20Abi from '../abis/erc20.abi.js';
import blockFallAbi from '../abis/BlockFallGame.abi.js';
import {
  BLOCKFALL_GAME_ADDRESS,
  USDT_ADDRESS,
  USDC_ADDRESS,
  USDm_ADDRESS,
} from '../constants.js';
import { getAuthedApi } from '../api.js';

// txStatus: null | 'awaiting_wallet' | 'confirming' | 'rejected' | 'error' | 'success'

const EXTRA_BALANCE_USD = 0.01;

export function usePlayGame() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [txStatus, setTxStatus] = useState(null);
  const [balanceError, setBalanceError] = useState(null);

  async function buyItem(itemTypeId) {
    setBalanceError(null);
    setTxStatus('awaiting_wallet');
    try {
      // 1. Fetch balances and decimals for all three stablecoins (priority order: USDT > USDC > USDm)
      const tokens = [
        { address: USDT_ADDRESS },
        { address: USDC_ADDRESS },
        { address: USDm_ADDRESS },
      ];

      const [balances, decimals] = await Promise.all([
        Promise.all(
          tokens.map((t) =>
            publicClient.readContract({
              address: t.address,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [address],
            })
          )
        ),
        Promise.all(
          tokens.map((t) =>
            publicClient.readContract({
              address: t.address,
              abi: erc20Abi,
              functionName: 'decimals',
            })
          )
        ),
      ]);

      // 2. Select the token with the highest balance (priority order breaks ties: USDT > USDC > USDm)
      let selectedIndex = 0;
      for (let i = 1; i < balances.length; i++) {
        if (balances[i] > balances[selectedIndex]) selectedIndex = i;
      }

      const selectedToken = tokens[selectedIndex].address;

      // 3. Get the price for this item + token
      const price = await publicClient.readContract({
        address: BLOCKFALL_GAME_ADDRESS,
        abi: blockFallAbi,
        functionName: 'priceByItem',
        args: [BigInt(itemTypeId), selectedToken],
      });

      // 4. Check if best balance meets price + 1 cent
      const bestDecimals = decimals[selectedIndex];
      const extraAmount = BigInt(Math.round(EXTRA_BALANCE_USD * 10 ** Number(bestDecimals)));
      if (balances[selectedIndex] < price + extraAmount) {
        setTxStatus(null);
        setBalanceError('Not enough balance');
        return false;
      }

      // 5. Check allowance, approve if needed
      const allowance = await publicClient.readContract({
        address: selectedToken,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [address, BLOCKFALL_GAME_ADDRESS],
      });

      if (allowance < price) {
        const approveTxHash = await writeContractAsync({
          address: selectedToken,
          abi: erc20Abi,
          functionName: 'approve',
          args: [BLOCKFALL_GAME_ADDRESS, 2n ** 256n - 1n],
        });
        setTxStatus('confirming');
        const approveReceipt = await publicClient.waitForTransactionReceipt({
          hash: approveTxHash,
          confirmations: 1,
        });
        if (approveReceipt.status === 'reverted') {
          throw new Error('Approve transaction reverted');
        }
        setTxStatus('awaiting_wallet');
      }

      // 6. Call buy(itemTypeId, paymentToken)
      const buyTxHash = await writeContractAsync({
        address: BLOCKFALL_GAME_ADDRESS,
        abi: blockFallAbi,
        functionName: 'buy',
        args: [BigInt(itemTypeId), selectedToken],
      });
      setTxStatus('confirming');
      const buyReceipt = await publicClient.waitForTransactionReceipt({
        hash: buyTxHash,
        confirmations: 1,
      });
      if (buyReceipt.status === 'reverted') {
        throw new Error('Buy transaction reverted');
      }

      // 7. Submit tx_hash to backend for verification
      const authedApi = getAuthedApi(address);
      if (authedApi) {
        await authedApi.purchase.submit.$post({ json: { tx_hash: buyTxHash } });
      }

      setTxStatus('success');
      return true;
    } catch (err) {
      const isRejection =
        err instanceof UserRejectedRequestError ||
        err?.cause instanceof UserRejectedRequestError ||
        err?.code === 4001 ||
        err?.message?.toLowerCase().includes('rejected') ||
        err?.message?.toLowerCase().includes('denied by user');

      if (isRejection) {
        setTxStatus('rejected');
      } else {
        setTxStatus('error');
      }
      return false;
    }
  }

  async function startPlay() {
    return buyItem(1);
  }

  function resetTxStatus() {
    setTxStatus(null);
  }

  function resetBalanceError() {
    setBalanceError(null);
  }

  return { startPlay, buyItem, txStatus, resetTxStatus, balanceError, resetBalanceError };
}
