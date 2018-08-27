import * as YAML from "yamljs";
import * as path from "path";
import { MediaPlayers } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";

interface MediaPlayersResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const root = path.resolve(__dirname);
const mediaPlayers: MediaPlayers = YAML.load(root + "/../../node_modules/device-detector/regexes/client/mediaplayers.yml");

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
      result.client.name = variableReplacement(mediaPlayer.name, match.slice(1));
      result.client.version = formatVersion(variableReplacement(mediaPlayer.version, match.slice(1)));

      break;
    }

    return result;
  };
}
