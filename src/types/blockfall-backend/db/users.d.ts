export type UserRow = {
    user_id: string;
    address: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
};
export type UserWithNumbersRow = UserRow & {
    best_score: number;
    last_score: number;
    games_played: number;
    total_score: string;
    today_score: number;
    energy: number;
};
export declare function findUserByAddress(address: string): Promise<UserRow | null>;
export declare function findUserByName(name: string): Promise<UserRow | null>;
export declare function getUserWithNumbers(address: string): Promise<UserWithNumbersRow | null>;
export type UserItemRow = {
    item_id: string;
    item_type: number;
    acquisition_type: string;
    buy_date: Date | null;
};
export declare function getUserInventory(userId: string): Promise<UserItemRow[]>;
/**
 * Creates a user + user_numbers (with initial energy) + energy_issuance record
 * in a single transaction. Throws postgres error '23505' on duplicate address/name.
 */
export declare function createUser(address: string, name: string): Promise<UserRow>;
//# sourceMappingURL=users.d.ts.map