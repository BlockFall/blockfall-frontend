export interface LeaderboardEntry {
    user_id: string;
    name: string;
    address: string;
    total_score: number;
    rank: number;
}
export interface YesterdayLeaderboardEntry extends LeaderboardEntry {
    reward: string | null;
}
export declare function fetchYesterdayLeaderboard(): Promise<YesterdayLeaderboardEntry[]>;
export declare function fetchTodayLeaderboard(): Promise<LeaderboardEntry[]>;
export declare function fetchOverallLeaderboard(): Promise<LeaderboardEntry[]>;
//# sourceMappingURL=leaderboard.d.ts.map