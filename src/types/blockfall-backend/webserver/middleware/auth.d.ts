export interface JwtPayload {
    user_id: string;
    address: string;
    chainId: number;
}
export interface AuthEnv {
    Variables: {
        user: JwtPayload;
    };
}
/**
 * Requires a valid Bearer JWT issued by POST /auth/verify.
 * On success, sets c.var.user = { address, chainId }.
 * On failure, returns 401.
 *
 * Usage:
 *   const protectedRoutes = new Hono<AuthEnv>()
 *     .use(authMiddleware)
 *     .get('/me', (c) => c.json({ address: c.var.user.address }))
 */
export declare const authMiddleware: import("hono").MiddlewareHandler<AuthEnv, string, {}, Response>;
//# sourceMappingURL=auth.d.ts.map