import * as YAML from "yamljs";
import * as path from "path";
import { FeedReaders } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";

interface FeedReaderResult {
  client: {
    type: string;
    name: string;
    version: string;
    url: string;
  }
}

const root = path.resolve(__dirname);
const feedReaders: FeedReaders = YAML.load(root + "/../../node_modules/device-detector/regexes/client/feed_readers.yml");

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
      result.client.name = variableReplacement(feedReader.name, match.slice(1));
      result.client.version = formatVersion(variableReplacement(feedReader.version, match.slice(1)));
      result.client.url = feedReader.url;

      break;
    }

    return result;
  };
}
