import { BrowserResult } from "./browser";
import { MobileAppResult } from "./mobile-apps";
import { FeedReaderResult } from "./feed-readers";
import { LibraryResult } from "./libraries";
import { MediaPlayerResult } from "./media-players";
import { PersonalInformationManagerResult } from "./personal-information-managers";
export declare type ClientResult = BrowserResult | FeedReaderResult | LibraryResult | MediaPlayerResult | MobileAppResult | PersonalInformationManagerResult | null;
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class ClientParser {
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => ClientResult;
}
export {};
