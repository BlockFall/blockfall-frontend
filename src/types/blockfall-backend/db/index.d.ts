import postgres from 'postgres';
/**
 * Shared connection pool — import `sql` wherever you need to run queries.
 * postgres.js is lazy: the pool connects on the first query, not at import time.
 */
export declare const sql: postgres.Sql<{}>;
/**
 * Run `fn` inside a database transaction.
 *
 * Use this instead of `sql.begin()` to sidestep a known race condition in
 * postgres.js (https://github.com/porsager/postgres/issues/823) that surfaces
 * under high concurrency as `UNSAFE_TRANSACTION` errors plus PostgreSQL
 * warnings "there is already a transaction in progress" (code 25001):
 * `sql.begin()` marks the connection reserved via an `onexecute` callback that
 * is skipped under TCP backpressure or pipeline saturation, so the pool can
 * end up dispatching a second BEGIN onto a connection that still has a
 * transaction in flight.
 *
 * `sql.reserve()` flips the reservation flag synchronously *before* any query
 * is sent, so the pool's transaction bookkeeping cannot race with the BEGIN.
 */
export declare function withTransaction<T>(fn: (tx: postgres.ReservedSql) => Promise<T>): Promise<T>;
//# sourceMappingURL=index.d.ts.map