import { useState } from 'react';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';
import { UserRejectedRequestError } from 'viem';
import blockFallAbi from '../abis/BlockFallGame.abi.js';
import { BLOCKFALL_GAME_ADDRESS, PAYMENT_TOKENS } from '../constants.js';
import { getAuthedApi } from '../api.js';

export function useClaim() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [txStatus, setTxStatus] = useState(null);
  const [claimingId, setClaimingId] = useState(null);

  async function claim(pendingClaim) {
    const tokenInfo = PAYMENT_TOKENS[pendingClaim.payment_token];
    if (!tokenInfo) {
      setTxStatus('error');
      return false;
    }

    setClaimingId(pendingClaim.payout_id);
    setTxStatus('awaiting_wallet');
    try {
      const txHash = await writeContractAsync({
        address: BLOCKFALL_GAME_ADDRESS,
        abi: blockFallAbi,
        functionName: 'claim',
        args: [
          BigInt(pendingClaim.action_id),
          tokenInfo.address,
          BigInt(pendingClaim.amount),
          pendingClaim.signature,
        ],
      });
      setTxStatus('confirming');
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
      });
      if (receipt.status === 'reverted') {
        throw new Error('Claim transaction reverted');
      }

      const authedApi = getAuthedApi(address);
      if (authedApi) {
        await authedApi.user_claims.submit.$post({ json: { tx_hash: txHash } });
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
      setTxStatus(isRejection ? 'rejected' : 'error');
      return false;
    } finally {
      setClaimingId(null);
    }
  }

  function resetTxStatus() {
    setTxStatus(null);
  }

  return { claim, txStatus, claimingId, resetTxStatus };
}
