export type UserSource = 'mobile-web' | 'web' | 'minipay';
export interface UserRow {
    user_id: string;
    address: string;
    user_source: UserSource;
    wallet_info: string;
    name: string;
    is_banned: boolean;
    created_at: Date;
}
export type UserWithNumbersRow = UserRow & {
    best_score: number;
    last_score: number;
    games_played: number;
    total_score: string;
    today_score: number;
    energy: number;
};
export declare function findUserByAddress(address: string): Promise<UserRow | null>;
export declare const findUserByAddressCached: (params: string) => Promise<UserRow | null | undefined>;
export declare function findUserIdByAddress(address: string): Promise<string | null>;
export declare const findUserIdByAddressCached: (params: string) => Promise<string | null | undefined>;
export declare const getCachedBannedUserIds: () => Promise<Set<string> | null | undefined>;
export declare function findUserByName(name: string): Promise<UserRow | null>;
export declare function getUserWithNumbers(userId: string): Promise<UserWithNumbersRow | null>;
export interface UserItemRow {
    item_id: string;
    item_type: number;
    acquisition_type: string;
    acquisition_date: Date;
}
export declare function getUserInventory(userId: string): Promise<UserItemRow[]>;
export type CreateUserResult = {
    success: true;
    user: UserRow;
} | {
    success: false;
    reason: 'name_taken';
};
/**
 * Creates a user + initial user_mutable_data + user_numbers (with initial energy)
 * + energy_issuance record in a single transaction. Name uniqueness is checked
 * via `users_with_data` (latest mutable row per user), serialized via a
 * transaction-scoped advisory lock keyed on the name. The unique constraint
 * on users.address still throws postgres error '23505' on duplicate address.
 */
export declare function createUser(address: string, name: string, userSource: UserSource, walletInfo: string): Promise<CreateUserResult>;
export type RenameResult = {
    success: true;
} | {
    success: false;
    reason: 'name_taken' | 'user_not_found' | 'no_change';
};
/**
 * Inserts a new user_mutable_data row with the given name, preserving the
 * latest is_banned flag. Uniqueness is checked via `users_with_data` inside
 * the same transaction; a transaction-scoped advisory lock keyed on the name
 * serializes concurrent renames to the same target.
 */
export declare function renameUser(address: string, newName: string): Promise<RenameResult>;
//# sourceMappingURL=users.d.ts.map