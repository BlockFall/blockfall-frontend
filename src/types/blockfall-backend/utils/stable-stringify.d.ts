type Replacer = (this: object, key: string, value: unknown) => unknown;
interface CmpEntry {
    key: string;
    value: unknown;
}
type CmpFunction = (a: CmpEntry, b: CmpEntry) => number;
export interface StableStringifyOptions {
    space?: string | number;
    cycles?: boolean;
    replacer?: Replacer;
    cmp?: CmpFunction;
}
export default function stableStringify(obj: unknown, opts?: StableStringifyOptions | CmpFunction): string | undefined;
export {};
//# sourceMappingURL=stable-stringify.d.ts.map