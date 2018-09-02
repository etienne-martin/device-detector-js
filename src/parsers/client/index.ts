import BrowserParser, { BrowserResult } from "./browser";
import MobileAppParser, { MobileAppResult } from "./mobile-apps";
import FeedReaderParser, { FeedReaderResult } from "./feed-readers";
import LibraryParser, { LibraryResult } from "./libraries";
import MediaPlayerParser, { MediaPlayerResult } from "./media-players";
import PersonalInformationManagerParser, { PersonalInformationManagerResult } from "./personal-information-managers";

export type ClientResult = BrowserResult | FeedReaderResult | LibraryResult | MediaPlayerResult | MobileAppResult | PersonalInformationManagerResult | null;

const clientParsers = [
  FeedReaderParser,
  MobileAppParser,
  MediaPlayerParser,
  PersonalInformationManagerParser,
  BrowserParser,
  LibraryParser
];

export default class ClientParser {
  public parse = (userAgent: string): ClientResult => {
    for (const Parser of clientParsers) {
      const parser = new Parser();
      const client = parser.parse(userAgent);

      if (client.type !== "") {
        return client;
      }
    }

    return null;
  };
}
