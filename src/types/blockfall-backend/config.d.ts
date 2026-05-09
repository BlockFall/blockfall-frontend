interface ConfigValues {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    HOST: string;
    JWT_SECRET: string;
    SIWE_DOMAINS: string;
    DATABASE_URL: string;
    ENCRYPTED_PASS: string;
    ENCRYPTED_SIGNER_PRIVATE_KEY: string;
    siweDomains: string[];
}
declare const config: ConfigValues;
export type Config = ConfigValues;
export default config;
//# sourceMappingURL=config.d.ts.map