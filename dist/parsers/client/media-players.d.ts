export interface MediaPlayerResult {
    type: string;
    name: string;
    version: string;
}
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class MediaPlayerParser {
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => MediaPlayerResult;
}
export {};
