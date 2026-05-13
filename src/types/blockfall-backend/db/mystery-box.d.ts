export type OpenMysteryBoxResult = {
    success: true;
    prize_item_type: number;
    prize_user_item_id: string | null;
    energy_granted: number | null;
} | {
    success: false;
    reason: 'not_found_or_already_opened';
};
/**
 * Opens a mystery box owned by `userId`. Transactionally:
 *   1. Verifies the box exists, belongs to the user, and hasn't been used.
 *   2. Picks the lowest-id unused mystery_box_prizes row, generating a fresh
 *      randomized batch of 40 if the pool is empty.
 *   3. Inserts user_item_usages for the box (marks it as used).
 *   4. Inserts mystery_box_given_items linking the prize to that usage.
 *   5. Inserts a user_items row for the prize (acquisition_type='mystery_box',
 *      source_mystery_box_id = the box). If the prize is an energy package the
 *      energy is issued immediately and the prize item is auto-marked as used.
 */
export declare function openMysteryBox(userId: string, mysteryBoxItemId: string): Promise<OpenMysteryBoxResult>;
//# sourceMappingURL=mystery-box.d.ts.map