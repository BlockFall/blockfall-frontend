export interface PendingPayoutRow {
    payout_id: string;
    payout_type: string;
    action_id: string;
    amount: string;
    payment_token: number;
    signature: string;
}
export interface PayoutForClaimRow {
    payout_id: string;
    user_id: string;
    amount: string;
    payment_token: number;
    claim_transaction_id: string | null;
}
export declare function getPendingPayouts(userId: string): Promise<PendingPayoutRow[]>;
export declare function findPayoutByActionId(actionId: string): Promise<PayoutForClaimRow | null>;
/**
 * Processes a claim transaction. Transactionally:
 * 1. Inserts into user_transactions (revenue = 0)
 * 2. Inserts into user_claims
 *
 * Relies on the user_claims PK to guard against concurrent double-claims.
 */
export declare function processClaim(userId: string, payoutId: string, txHash: string, txTime: Date, eventParams: object): Promise<{
    transaction_id: string;
}>;
//# sourceMappingURL=payouts.d.ts.map