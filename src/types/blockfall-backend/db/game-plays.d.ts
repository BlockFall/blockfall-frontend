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
export declare function startGamePlay(userId: string, dayId: string, ipAddress: string | null): Promise<GamePlayRow | null>;
export type EndGamePlayError = 'invalid_session' | 'session_expired' | 'time_too_short' | 'too_few_line_clears';
export type EndGamePlayOutcome = {
    ok: true;
    result: GamePlayResultRow;
} | {
    ok: false;
    error: EndGamePlayError;
};
/**
 * Ends a game play session. Validates:
 * 1. Active play time is within 30 minutes (wall-clock since start, minus
 *    pause→resume intervals from game_ingame_events)
 * 2. Score is plausible for the observed active play time
 * 3. Score is plausible for the observed line_clear event count
 * 4. The game play exists, belongs to the given user, and hasn't ended yet
 *
 * On success inserts a game_play_results row and updates user_numbers
 * (last_score, best_score, total_score).
 */
export declare function endGamePlay(gamePlayId: string, userId: string, score: number): Promise<EndGamePlayOutcome>;
export declare function bufferIngameEvent(gamePlayId: string, eventType: string, intval: number | null, textval: string | null, extraData: unknown): {
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