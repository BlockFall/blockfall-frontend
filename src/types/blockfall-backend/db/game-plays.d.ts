export interface GamePlayRow {
    game_play_id: string;
    user_id: string;
    daily_tournament_id: string;
    boost_multiplier: number;
}
export interface GamePlayResultRow {
    game_play_id: string;
    ended_at: Date;
    score: number;
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
 * 1. The game play exists and belongs to the given user
 * 2. It hasn't already ended (no row in game_play_results)
 * 3. Active play time is within 30 minutes (wall-clock since start, minus
 *    pause→resume intervals from game_ingame_events)
 *
 * Inserts a game_play_results row, and updates user_numbers
 * (last_score, best_score, total_score).
 *
 * Returns the inserted result row, or null if validation fails.
 */
export declare function endGamePlay(gamePlayId: string, userId: string, score: number): Promise<GamePlayResultRow | null>;
export declare function bufferIngameEvent(gamePlayId: string, userId: string, eventType: string, intval: number | null, textval: string | null, extraData: unknown): {
    event_time: Date;
};
/**
 * Flushes the in-game event buffer. Concurrent calls share a single in-flight
 * flush so the bulk insert never overlaps itself.
 */
export declare function flushIngameEvents(): Promise<void>;
/**
 * Gets today's tournament, creating it if it doesn't exist.
 */
export declare function getOrCreateTodayTournament(): Promise<string>;
//# sourceMappingURL=game-plays.d.ts.map