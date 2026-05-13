import { z } from 'zod';
import { type AuthEnv } from '../middleware/auth.ts';
/**
 * GET  /user         — authenticated user's profile + stats
 * POST /user/rename  — change the authenticated user's display name
 */
export declare const userRoutes: import("hono/hono-base").HonoBase<AuthEnv, {
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
                user_id: string;
                address: string;
                name: string;
                user_source: import("../../db/users.ts").UserSource;
                is_banned: boolean;
                created_at: string;
                stats: {
                    best_score: number;
                    last_score: number;
                    games_played: number;
                    total_score: string;
                    today_score: number;
                    energy: number;
                };
                inventory: {
                    item_id: string;
                    item_type: number;
                    acquisition_type: string;
                    acquisition_date: string;
                }[];
                pending_claims: {
                    payout_id: string;
                    payout_type: string;
                    action_id: string;
                    amount: string;
                    payment_token: number;
                    signature: string;
                }[];
                active_booster: {
                    user_booster_activation_id: string;
                    item_id: string;
                    multiplier: number;
                    started_at: string;
                    expires_at: string;
                } | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/rename": {
        $post: {
            input: {
                json: {
                    name: string;
                };
            };
            output: {
                error: string;
                details: ({
                    readonly code: "invalid_type";
                    readonly expected: z.core.$ZodInvalidTypeExpected;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "too_big";
                    readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                    readonly maximum: number;
                    readonly inclusive?: boolean | undefined;
                    readonly exact?: boolean | undefined;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "too_small";
                    readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                    readonly minimum: number;
                    readonly inclusive?: boolean | undefined;
                    readonly exact?: boolean | undefined;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_format";
                    readonly format: z.core.$ZodStringFormats | (string & {});
                    readonly pattern?: string | undefined;
                    readonly input?: string | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "not_multiple_of";
                    readonly divisor: number;
                    readonly input?: number | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "unrecognized_keys";
                    readonly keys: string[];
                    readonly input?: {
                        [x: string]: import("hono/utils/types").JSONValue;
                    } | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_union";
                    readonly errors: ({
                        readonly code: "invalid_type";
                        readonly expected: z.core.$ZodInvalidTypeExpected;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_big";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly maximum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_small";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly minimum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_format";
                        readonly format: z.core.$ZodStringFormats | (string & {});
                        readonly pattern?: string | undefined;
                        readonly input?: string | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "not_multiple_of";
                        readonly divisor: number;
                        readonly input?: number | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "unrecognized_keys";
                        readonly keys: string[];
                        readonly input?: {
                            [x: string]: import("hono/utils/types").JSONValue;
                        } | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | /*elided*/ any | {
                        readonly code: "invalid_union";
                        readonly errors: [];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive: false;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_key";
                        readonly origin: "map" | "record";
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_element";
                            readonly origin: "map" | "set";
                            readonly key: import("hono/utils/types").JSONValue;
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_element";
                        readonly origin: "map" | "set";
                        readonly key: import("hono/utils/types").JSONValue;
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_key";
                            readonly origin: "map" | "record";
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_value";
                        readonly values: (string | number | boolean | null)[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "custom";
                        readonly params?: {
                            [x: string]: any;
                        } | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    })[][];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly discriminator?: string | undefined | undefined;
                    readonly inclusive?: true | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_union";
                    readonly errors: [];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly discriminator?: string | undefined | undefined;
                    readonly inclusive: false;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_key";
                    readonly origin: "map" | "record";
                    readonly issues: ({
                        readonly code: "invalid_type";
                        readonly expected: z.core.$ZodInvalidTypeExpected;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_big";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly maximum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_small";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly minimum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_format";
                        readonly format: z.core.$ZodStringFormats | (string & {});
                        readonly pattern?: string | undefined;
                        readonly input?: string | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "not_multiple_of";
                        readonly divisor: number;
                        readonly input?: number | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "unrecognized_keys";
                        readonly keys: string[];
                        readonly input?: {
                            [x: string]: import("hono/utils/types").JSONValue;
                        } | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_element";
                            readonly origin: "map" | "set";
                            readonly key: import("hono/utils/types").JSONValue;
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[][];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive?: true | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: [];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive: false;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | /*elided*/ any | {
                        readonly code: "invalid_element";
                        readonly origin: "map" | "set";
                        readonly key: import("hono/utils/types").JSONValue;
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[][];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive?: true | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_value";
                        readonly values: (string | number | boolean | null)[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "custom";
                        readonly params?: {
                            [x: string]: any;
                        } | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    })[];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_element";
                    readonly origin: "map" | "set";
                    readonly key: import("hono/utils/types").JSONValue;
                    readonly issues: ({
                        readonly code: "invalid_type";
                        readonly expected: z.core.$ZodInvalidTypeExpected;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_big";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly maximum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_small";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly minimum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_format";
                        readonly format: z.core.$ZodStringFormats | (string & {});
                        readonly pattern?: string | undefined;
                        readonly input?: string | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "not_multiple_of";
                        readonly divisor: number;
                        readonly input?: number | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "unrecognized_keys";
                        readonly keys: string[];
                        readonly input?: {
                            [x: string]: import("hono/utils/types").JSONValue;
                        } | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_key";
                            readonly origin: "map" | "record";
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[][];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive?: true | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: [];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive: false;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_key";
                        readonly origin: "map" | "record";
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[][];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive?: true | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | /*elided*/ any | {
                        readonly code: "invalid_value";
                        readonly values: (string | number | boolean | null)[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "custom";
                        readonly params?: {
                            [x: string]: any;
                        } | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    })[];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_value";
                    readonly values: (string | number | boolean | null)[];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "custom";
                    readonly params?: {
                        [x: string]: any;
                    } | undefined;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                })[];
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                json: {
                    name: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                json: {
                    name: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 409;
        } | {
            input: {
                json: {
                    name: string;
                };
            };
            output: {
                name: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/", "/rename">;
/**
 * GET /checkuser?account — check if a wallet address is already registered.
 * Public endpoint — no auth required.
 */
export declare const checkUserRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $get: {
            input: {
                query: {
                    account: string | string[];
                };
            };
            output: {
                error: string;
                details: ({
                    readonly code: "invalid_type";
                    readonly expected: z.core.$ZodInvalidTypeExpected;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "too_big";
                    readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                    readonly maximum: number;
                    readonly inclusive?: boolean | undefined;
                    readonly exact?: boolean | undefined;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "too_small";
                    readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                    readonly minimum: number;
                    readonly inclusive?: boolean | undefined;
                    readonly exact?: boolean | undefined;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_format";
                    readonly format: z.core.$ZodStringFormats | (string & {});
                    readonly pattern?: string | undefined;
                    readonly input?: string | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "not_multiple_of";
                    readonly divisor: number;
                    readonly input?: number | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "unrecognized_keys";
                    readonly keys: string[];
                    readonly input?: {
                        [x: string]: import("hono/utils/types").JSONValue;
                    } | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_union";
                    readonly errors: ({
                        readonly code: "invalid_type";
                        readonly expected: z.core.$ZodInvalidTypeExpected;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_big";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly maximum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_small";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly minimum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_format";
                        readonly format: z.core.$ZodStringFormats | (string & {});
                        readonly pattern?: string | undefined;
                        readonly input?: string | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "not_multiple_of";
                        readonly divisor: number;
                        readonly input?: number | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "unrecognized_keys";
                        readonly keys: string[];
                        readonly input?: {
                            [x: string]: import("hono/utils/types").JSONValue;
                        } | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | /*elided*/ any | {
                        readonly code: "invalid_union";
                        readonly errors: [];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive: false;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_key";
                        readonly origin: "map" | "record";
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_element";
                            readonly origin: "map" | "set";
                            readonly key: import("hono/utils/types").JSONValue;
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_element";
                        readonly origin: "map" | "set";
                        readonly key: import("hono/utils/types").JSONValue;
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_key";
                            readonly origin: "map" | "record";
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_value";
                        readonly values: (string | number | boolean | null)[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "custom";
                        readonly params?: {
                            [x: string]: any;
                        } | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    })[][];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly discriminator?: string | undefined | undefined;
                    readonly inclusive?: true | undefined;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_union";
                    readonly errors: [];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly discriminator?: string | undefined | undefined;
                    readonly inclusive: false;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_key";
                    readonly origin: "map" | "record";
                    readonly issues: ({
                        readonly code: "invalid_type";
                        readonly expected: z.core.$ZodInvalidTypeExpected;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_big";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly maximum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_small";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly minimum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_format";
                        readonly format: z.core.$ZodStringFormats | (string & {});
                        readonly pattern?: string | undefined;
                        readonly input?: string | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "not_multiple_of";
                        readonly divisor: number;
                        readonly input?: number | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "unrecognized_keys";
                        readonly keys: string[];
                        readonly input?: {
                            [x: string]: import("hono/utils/types").JSONValue;
                        } | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_element";
                            readonly origin: "map" | "set";
                            readonly key: import("hono/utils/types").JSONValue;
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[][];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive?: true | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: [];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive: false;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | /*elided*/ any | {
                        readonly code: "invalid_element";
                        readonly origin: "map" | "set";
                        readonly key: import("hono/utils/types").JSONValue;
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[][];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive?: true | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_value";
                        readonly values: (string | number | boolean | null)[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "custom";
                        readonly params?: {
                            [x: string]: any;
                        } | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    })[];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_element";
                    readonly origin: "map" | "set";
                    readonly key: import("hono/utils/types").JSONValue;
                    readonly issues: ({
                        readonly code: "invalid_type";
                        readonly expected: z.core.$ZodInvalidTypeExpected;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_big";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly maximum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "too_small";
                        readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                        readonly minimum: number;
                        readonly inclusive?: boolean | undefined;
                        readonly exact?: boolean | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_format";
                        readonly format: z.core.$ZodStringFormats | (string & {});
                        readonly pattern?: string | undefined;
                        readonly input?: string | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "not_multiple_of";
                        readonly divisor: number;
                        readonly input?: number | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "unrecognized_keys";
                        readonly keys: string[];
                        readonly input?: {
                            [x: string]: import("hono/utils/types").JSONValue;
                        } | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_key";
                            readonly origin: "map" | "record";
                            readonly issues: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[][];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive?: true | undefined;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_union";
                        readonly errors: [];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly discriminator?: string | undefined | undefined;
                        readonly inclusive: false;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "invalid_key";
                        readonly origin: "map" | "record";
                        readonly issues: ({
                            readonly code: "invalid_type";
                            readonly expected: z.core.$ZodInvalidTypeExpected;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_big";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly maximum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "too_small";
                            readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                            readonly minimum: number;
                            readonly inclusive?: boolean | undefined;
                            readonly exact?: boolean | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_format";
                            readonly format: z.core.$ZodStringFormats | (string & {});
                            readonly pattern?: string | undefined;
                            readonly input?: string | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "not_multiple_of";
                            readonly divisor: number;
                            readonly input?: number | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "unrecognized_keys";
                            readonly keys: string[];
                            readonly input?: {
                                [x: string]: import("hono/utils/types").JSONValue;
                            } | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: ({
                                readonly code: "invalid_type";
                                readonly expected: z.core.$ZodInvalidTypeExpected;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_big";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly maximum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "too_small";
                                readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
                                readonly minimum: number;
                                readonly inclusive?: boolean | undefined;
                                readonly exact?: boolean | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "invalid_format";
                                readonly format: z.core.$ZodStringFormats | (string & {});
                                readonly pattern?: string | undefined;
                                readonly input?: string | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "not_multiple_of";
                                readonly divisor: number;
                                readonly input?: number | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "unrecognized_keys";
                                readonly keys: string[];
                                readonly input?: {
                                    [x: string]: import("hono/utils/types").JSONValue;
                                } | undefined;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | {
                                readonly code: "invalid_union";
                                readonly errors: [];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly discriminator?: string | undefined | undefined;
                                readonly inclusive: false;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | /*elided*/ any | /*elided*/ any | {
                                readonly code: "invalid_value";
                                readonly values: (string | number | boolean | null)[];
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            } | {
                                readonly code: "custom";
                                readonly params?: {
                                    [x: string]: any;
                                } | undefined;
                                readonly input?: import("hono/utils/types").JSONValue;
                                readonly path: (string | number | null)[];
                                readonly message: string;
                            })[][];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive?: true | undefined;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "invalid_union";
                            readonly errors: [];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly discriminator?: string | undefined | undefined;
                            readonly inclusive: false;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | /*elided*/ any | /*elided*/ any | {
                            readonly code: "invalid_value";
                            readonly values: (string | number | boolean | null)[];
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        } | {
                            readonly code: "custom";
                            readonly params?: {
                                [x: string]: any;
                            } | undefined;
                            readonly input?: import("hono/utils/types").JSONValue;
                            readonly path: (string | number | null)[];
                            readonly message: string;
                        })[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | /*elided*/ any | {
                        readonly code: "invalid_value";
                        readonly values: (string | number | boolean | null)[];
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    } | {
                        readonly code: "custom";
                        readonly params?: {
                            [x: string]: any;
                        } | undefined;
                        readonly input?: import("hono/utils/types").JSONValue;
                        readonly path: (string | number | null)[];
                        readonly message: string;
                    })[];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "invalid_value";
                    readonly values: (string | number | boolean | null)[];
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                } | {
                    readonly code: "custom";
                    readonly params?: {
                        [x: string]: any;
                    } | undefined;
                    readonly input?: import("hono/utils/types").JSONValue;
                    readonly path: (string | number | null)[];
                    readonly message: string;
                })[];
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                query: {
                    account: string | string[];
                };
            };
            output: {
                registered: false;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {
                query: {
                    account: string | string[];
                };
            };
            output: {
                registered: true;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/", "/">;
//# sourceMappingURL=user.d.ts.map