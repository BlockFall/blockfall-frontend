declare const config: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    HOST: string;
    JWT_SECRET: string;
    SIWE_DOMAIN: string;
    DATABASE_URL: string;
};
export type Config = typeof config;
export default config;
//# sourceMappingURL=config.d.ts.map