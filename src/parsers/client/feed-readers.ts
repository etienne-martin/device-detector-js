import { FeedReaders } from "../../typings/client";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface FeedReaderResult {
  type: string;
  name: string;
  version: string;
  url: string;
}

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const feedReaders: FeedReaders = loadRegexes("client/feed_readers");

export default class FeedReaderParser {
  private readonly options: Options = {
    versionTruncation: 1
  };

  constructor(options?: Partial<Options>) {
    this.options = {...this.options, ...options};
  }

  public parse = (userAgent: string): FeedReaderResult => {
    const result: FeedReaderResult = {
      type: "",
      name: "",
      version: "",
      url: ""
    };

    for (const feedReader of feedReaders) {
      const match = userAgentParser(feedReader.regex, userAgent);

      if (!match) continue;

      result.type = "feed reader";
      result.name = variableReplacement(feedReader.name, match);
      result.version = formatVersion(variableReplacement(feedReader.version, match), this.options.versionTruncation);
      result.url = feedReader.url;
      break;
    }

    return result;
  };
}
