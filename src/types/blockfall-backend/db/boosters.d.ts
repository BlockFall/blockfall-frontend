export interface BoosterActivationRow {
    user_booster_activation_id: string;
    item_id: string;
    multiplier: number;
    started_at: Date;
    expires_at: Date;
}
export type ActivateBoosterError = 'item_not_found' | 'item_already_used' | 'booster_already_active';
export type ActivateBoosterOutcome = {
    ok: true;
    activation: BoosterActivationRow;
} | {
    ok: false;
    error: ActivateBoosterError;
};
/**
 * Returns the user's currently-active booster (latest activation whose window
 * is still open), or null if none. Uses idx_user_booster_activations_latest.
 */
export declare function getActiveBooster(userId: string): Promise<BoosterActivationRow | null>;
/**
 * Activates a booster item owned by `userId`. Transactionally:
 *   1. Verifies the item exists, belongs to the user, is a known booster type,
 *      and hasn't been used.
 *   2. Verifies the user has no other booster whose window is still open.
 *   3. Inserts user_item_usages for the booster item (marks it as used). The
 *      UNIQUE(item_id) constraint there is the race guard against double-spend.
 *   4. Inserts a user_booster_activations row with multiplier + expires_at
 *      derived from BOOST_INFO_BY_ITEM_TYPE.
 */
export declare function activateBooster(userId: string, itemId: string): Promise<ActivateBoosterOutcome>;
//# sourceMappingURL=boosters.d.ts.map