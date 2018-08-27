import { FeedReaders } from "../../typings/device-detector";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

interface FeedReaderResult {
  client: {
    type: string;
    name: string;
    version: string;
    url: string;
  }
}

const feedReaders: FeedReaders = loadRegexes("client/feed_readers");

export default class FeedReaderParser {
  public detect = (userAgent: string): FeedReaderResult => {
    const result: FeedReaderResult = {
      client: {
        type: "",
        name: "",
        version: "",
        url: ""
      }
    };

    for (const feedReader of feedReaders) {
      const match = userAgentParser(feedReader.regex, userAgent);

      if (!match) continue;

      result.client.type = "feed reader";
      result.client.name = variableReplacement(feedReader.name, match);
      result.client.version = formatVersion(variableReplacement(feedReader.version, match));
      result.client.url = feedReader.url;

      break;
    }

    return result;
  };
}
