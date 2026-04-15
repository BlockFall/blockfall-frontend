/**
 * Checks if a transaction hash already exists in user_transactions.
 */
export declare function findTransactionByHash(txHash: string): Promise<boolean>;
/**
 * Processes a purchase transaction. Transactionally:
 * 1. Inserts into user_transactions
 * 2. If energy package (itemTypeId 1-4): inserts energy_issuance, increments user energy
 * 3. If mystery box (itemTypeId 101): inserts into user_items
 */
export declare function processPurchase(userId: string, txHash: string, txTime: Date, revenue: string, itemTypeId: number, eventParams: object): Promise<{
    transaction_id: string;
}>;
//# sourceMappingURL=purchases.d.ts.map