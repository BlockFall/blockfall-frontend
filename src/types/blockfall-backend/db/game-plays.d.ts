export interface GamePlayRow {
    game_play_id: string;
    user_id: string;
    started_at: Date;
    ended_at: Date | null;
    score: number | null;
    boost_multiplier: number | null;
    daily_tournament_id: string;
}
/**
 * Starts a game play session. Transactionally:
 * 1. Checks that user has energy > 0
 * 2. Decrements energy by 1
 * 3. Inserts a new game_plays row
 *
 * Returns the new game play row, or null if energy is 0.
 */
export declare function startGamePlay(userId: string, dayId: string): Promise<GamePlayRow | null>;
/**
 * Ends a game play session. Validates:
 * 1. The game play belongs to the given user
 * 2. It hasn't already ended
 * 3. It started within the last 15 minutes
 *
 * Updates score and ended_at, and also updates user_numbers
 * (last_score, best_score, total_score).
 *
 * Returns the updated game play row, or null if validation fails.
 */
export declare function endGamePlay(gamePlayId: string, userId: string, score: number): Promise<GamePlayRow | null>;
/**
 * Gets today's tournament, creating it if it doesn't exist.
 */
export declare function getOrCreateTodayTournament(): Promise<string>;
//# sourceMappingURL=game-plays.d.ts.map