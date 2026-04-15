export interface CheckInDayRow {
    date: string;
    checked_in: boolean;
}
export interface CheckInResult {
    check_in_id: string;
    energy_granted: number;
    streak: number;
    mystery_box_item_id: string | null;
}
/**
 * Returns the last seven UTC dates (including today) with a flag indicating
 * whether the user checked in that day.
 */
export declare function getLastSevenDayCheckins(userId: string): Promise<CheckInDayRow[]>;
/**
 * Performs a daily check-in. Transactionally:
 *  1. Inserts a daily_checkins row for today (UTC); returns null if already checked in.
 *  2. Grants 1 energy via energy_issuance + user_numbers.energy bump.
 *  3. Computes the current consecutive-day streak ending today.
 *  4. If streak is a multiple of 7, inserts a mystery-box user_items row.
 *
 * Returns null if the user has already checked in today.
 */
export declare function performDailyCheckin(userId: string): Promise<CheckInResult | null>;
//# sourceMappingURL=daily-checkins.d.ts.map