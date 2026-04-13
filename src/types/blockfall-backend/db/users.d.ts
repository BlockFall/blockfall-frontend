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
    total_score: string;
    energy: number;
};
export declare function findUserByAddress(address: string): Promise<UserRow | null>;
export declare function findUserByName(name: string): Promise<UserRow | null>;
export declare function getUserWithNumbers(address: string): Promise<UserWithNumbersRow | null>;
/**
 * Creates a user + their user_numbers row atomically.
 * Throws a postgres error with code '23505' on duplicate address or name.
 */
export declare function createUser(address: string, name: string): Promise<UserRow>;
//# sourceMappingURL=users.d.ts.map