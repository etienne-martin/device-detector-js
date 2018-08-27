import { MediaPlayers } from "../../typings/device-detector";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

interface MediaPlayersResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const mediaPlayers: MediaPlayers = loadRegexes("client/mediaplayers");

export default class MediaPlayerParser {
  public detect = (userAgent: string): MediaPlayersResult => {
    const result: MediaPlayersResult = {
      client: {
        type: "",
        name: "",
        version: ""
      }
    };

    for (const mediaPlayer of mediaPlayers) {
      const match = userAgentParser(mediaPlayer.regex, userAgent);

      if (!match) continue;

      result.client.type = "media player";
      result.client.name = variableReplacement(mediaPlayer.name, match);
      result.client.version = formatVersion(variableReplacement(mediaPlayer.version, match));

      break;
    }

    return result;
  };
}
