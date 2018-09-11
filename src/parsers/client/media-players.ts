import { MediaPlayers } from "../../typings/client";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface MediaPlayerResult {
  type: string;
  name: string;
  version: string;
}

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const mediaPlayers: MediaPlayers = loadRegexes("client/mediaplayers");

export default class MediaPlayerParser {
  private readonly options: Options = {
    versionTruncation: 1
  };

  constructor(options?: Partial<Options>) {
    this.options = {...this.options, ...options};
  }

  public parse = (userAgent: string): MediaPlayerResult => {
    const result: MediaPlayerResult = {
      type: "",
      name: "",
      version: ""
    };

    for (const mediaPlayer of mediaPlayers) {
      const match = userAgentParser(mediaPlayer.regex, userAgent);

      if (!match) continue;

      result.type = "media player";
      result.name = variableReplacement(mediaPlayer.name, match);
      result.version = formatVersion(variableReplacement(mediaPlayer.version, match), this.options.versionTruncation);
      break;
    }

    return result;
  };
}
