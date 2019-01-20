import { PortableMediaPlayers, GenericDeviceResult } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";

const jsonpack = require("jsonpack");
const portableMediaPlayers: PortableMediaPlayers = jsonpack.unpack(require("../../../fixtures/regexes/device/portable_media_player.json"));

export default class PortableMediaPlayersParser {
  public parse = (userAgent: string): GenericDeviceResult => {
    const result: GenericDeviceResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, portableMediaPlayer] of Object.entries(portableMediaPlayers)) {
      const match = userAgentParser(portableMediaPlayer.regex, userAgent);

      if (!match) continue;

      result.type = portableMediaPlayer.device;
      result.brand = brand;

      if (portableMediaPlayer.model) {
        result.model = variableReplacement(portableMediaPlayer.model, match).trim();
      } else if (portableMediaPlayer.models) {
        for (const model of portableMediaPlayer.models) {
          const modelMatch = userAgentParser(model.regex, userAgent);

          if (!modelMatch) continue;

          result.model = variableReplacement(model.model, modelMatch).trim();
          break;
        }
      }
      break;
    }

    return result;
  };
}
