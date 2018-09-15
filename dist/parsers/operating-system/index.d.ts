export interface OperatingSystemResult {
    name: string;
    version: string;
    platform: "ARM" | "x64" | "x86" | "";
}
export declare type Result = OperatingSystemResult | null;
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class OperatingSystemParser {
    static getDesktopOsArray: () => string[];
    static getOsFamily: (osName: string) => string;
    private static getOsShortName;
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => Result;
    private parsePlatform;
}
export {};
