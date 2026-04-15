import { type AuthEnv } from '../middleware/auth.ts';
export declare const leaderboardRoutes: import("hono/hono-base").HonoBase<AuthEnv, {
    "/": {
        $get: {
            input: {};
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {};
            output: {
                yesterday: {
                    top: {
                        reward: string | null;
                        user_id: string;
                        name: string;
                        address: string;
                        total_score: number;
                        rank: number;
                    }[];
                    my_rank: {
                        reward: string | null;
                        user_id: string;
                        name: string;
                        address: string;
                        total_score: number;
                        rank: number;
                    } | null;
                };
                today: {
                    top: {
                        user_id: string;
                        name: string;
                        address: string;
                        total_score: number;
                        rank: number;
                    }[];
                    my_rank: {
                        user_id: string;
                        name: string;
                        address: string;
                        total_score: number;
                        rank: number;
                    } | null;
                };
                overall: {
                    top: {
                        user_id: string;
                        name: string;
                        address: string;
                        total_score: number;
                        rank: number;
                    }[];
                    my_rank: {
                        user_id: string;
                        name: string;
                        address: string;
                        total_score: number;
                        rank: number;
                    } | null;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/", "/">;
//# sourceMappingURL=leaderboard.d.ts.map