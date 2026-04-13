import postgres from 'postgres';
/**
 * Shared connection pool — import `sql` wherever you need to run queries.
 * postgres.js is lazy: the pool connects on the first query, not at import time.
 */
export declare const sql: postgres.Sql<{}>;
//# sourceMappingURL=index.d.ts.map