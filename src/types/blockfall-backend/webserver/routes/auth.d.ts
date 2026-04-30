import { z } from 'zod';
export declare const nameSchema: z.ZodString;
/**
 * Auth routes — mount at /auth
 *
 * GET  /auth/nonce        → { nonce: string }
 * POST /auth/verify       → { token: string, address: string }
 * POST /auth/signup       → { token: string, address: string }
 * GET  /auth/checkname    → { available: boolean }
 */
export declare const authRoutes: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/nonce": {
        $get: {
            input: {};
            output: {
                nonce: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/verify": {
        $post: {
            input: {
                json: {
                    message: string;
                    signature: string;
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
                    message: string;
                    signature: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 400 | 401;
        } | {
            input: {
                json: {
                    message: string;
                    signature: string;
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
                    message: string;
                    signature: string;
                };
            };
            output: {
                token: string;
                address: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/signup": {
        $post: {
            input: {
                json: {
                    message: string;
                    signature: string;
                    name: string;
                    user_source: "mobile-web" | "web" | "minipay";
                    wallet_info: string;
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
                    message: string;
                    signature: string;
                    name: string;
                    user_source: "mobile-web" | "web" | "minipay";
                    wallet_info: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 400 | 401;
        } | {
            input: {
                json: {
                    message: string;
                    signature: string;
                    name: string;
                    user_source: "mobile-web" | "web" | "minipay";
                    wallet_info: string;
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
                    message: string;
                    signature: string;
                    name: string;
                    user_source: "mobile-web" | "web" | "minipay";
                    wallet_info: string;
                };
            };
            output: {
                token: string;
                address: string;
                name: string;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/checkname": {
        $get: {
            input: {
                query: {
                    name: string | string[];
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
                    name: string | string[];
                };
            };
            output: {
                available: boolean;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/", "/checkname">;
//# sourceMappingURL=auth.d.ts.map