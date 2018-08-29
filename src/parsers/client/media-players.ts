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

let mediaPlayers: MediaPlayers;

export default class MediaPlayerParser {
  private readonly mediaPlayers: MediaPlayers;

  constructor() {
    this.mediaPlayers = mediaPlayers || loadRegexes("client/mediaplayers");

    if (!mediaPlayers) {
      mediaPlayers = this.mediaPlayers;
    }
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
      result.version = formatVersion(variableReplacement(mediaPlayer.version, match));

      break;
    }

    return result;
  };
}
