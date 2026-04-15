import { type AuthEnv } from '../middleware/auth.ts';
export declare const checkinRoutes: import("hono/hono-base").HonoBase<AuthEnv, {
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
                days: {
                    date: string;
                    checked_in: boolean;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/": {
        $post: {
            input: {};
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {};
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 409;
        } | {
            input: {};
            output: {
                check_in_id: string;
                energy_granted: number;
                streak: number;
                mystery_box_item_id: string | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/", "/">;
//# sourceMappingURL=checkin.d.ts.map