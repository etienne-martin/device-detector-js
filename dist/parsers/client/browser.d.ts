export interface BrowserResult {
    type: string;
    name: string;
    version: string;
    engine: string;
    engineVersion: string;
}
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class BrowserParser {
    static getBrowserShortName: (browserName: string) => string;
    static isMobileOnlyBrowser: (browserName: string) => boolean;
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => BrowserResult;
}
export {};
