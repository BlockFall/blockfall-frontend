import { type LimitFunction } from 'p-limit';
export interface SmartCacheOptions {
    cacheSeconds?: number;
    cacheSize?: number;
    autoRefresh?: boolean;
    limitFunction?: LimitFunction;
    fileBackupName?: string;
}
export declare function makeSmartCached<ReturnType>(func: () => Promise<ReturnType>, options?: SmartCacheOptions): () => Promise<ReturnType | null | undefined>;
export declare function makeSmartCached<InputType, ReturnType>(func: (params: InputType) => Promise<ReturnType>, options?: SmartCacheOptions): (params: InputType) => Promise<ReturnType | null | undefined>;
//# sourceMappingURL=smart-cache.d.ts.map