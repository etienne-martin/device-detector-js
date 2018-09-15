export interface MobileAppResult {
    type: string;
    name: string;
    version: string;
}
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class MobileAppParser {
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => MobileAppResult;
}
export {};
