declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, ({
    "/": {
        $get: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/health": {
        $get: {
            input: {};
            output: {
                status: "ok";
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}) | import("hono/types").MergeSchemaPath<{
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
                    readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                    readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                };
            };
            output: {
                error: string;
                details: ({
                    readonly code: "invalid_type";
                    readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                    readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                    readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                    readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
}, "/auth"> | import("hono/types").MergeSchemaPath<{
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
                created_at: string;
                stats: {
                    best_score: number;
                    last_score: number;
                    total_score: string;
                    energy: number;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/user"> | import("hono/types").MergeSchemaPath<{
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
                    readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                    readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                name: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/checkuser"> | import("hono/types").MergeSchemaPath<{
    "/start": {
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
            status: 400;
        } | {
            input: {};
            output: {
                game_play_id: string;
                started_at: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/end": {
        $post: {
            input: {
                json: {
                    game_play_id: string;
                    score: number;
                };
            };
            output: {
                error: string;
                details: ({
                    readonly code: "invalid_type";
                    readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                    readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                    game_play_id: string;
                    score: number;
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
                    game_play_id: string;
                    score: number;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                json: {
                    game_play_id: string;
                    score: number;
                };
            };
            output: {
                game_play_id: string;
                score: number | null;
                started_at: string;
                ended_at: string | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/game"> | import("hono/types").MergeSchemaPath<{
    "/submit": {
        $post: {
            input: {
                json: {
                    tx_hash: string;
                };
            };
            output: {
                error: string;
                details: ({
                    readonly code: "invalid_type";
                    readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                    readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                        readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                        readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                            readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                            readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                                readonly expected: import("zod/v4/core").$ZodInvalidTypeExpected;
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
                                readonly format: import("zod/v4/core").$ZodStringFormats | (string & {});
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
                    tx_hash: string;
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
                    tx_hash: string;
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
                    tx_hash: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                json: {
                    tx_hash: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                json: {
                    tx_hash: string;
                };
            };
            output: {
                transaction_id: string;
                item_type_id: number;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/purchase">, "/", "/health">;
export type AppType = typeof app;
export declare function startWebServer(): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map