export interface FeedReaderResult {
    type: string;
    name: string;
    version: string;
    url: string;
}
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class FeedReaderParser {
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => FeedReaderResult;
}
export {};
