import * as YAML from "yamljs";
import * as path from "path";
import { MobileApps } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";

interface MobileAppsResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const root = path.resolve(__dirname);
const mobileApps: MobileApps = YAML.load(root + "/../../node_modules/device-detector/regexes/client/mobile_apps.yml");

export default class MobileAppParser {
  public detect = (userAgent: string): MobileAppsResult => {
    const result: MobileAppsResult = {
      client: {
        type: "",
        name: "",
        version: ""
      }
    };

    for (const mobileApp of mobileApps) {
      const match = userAgentParser(mobileApp.regex, userAgent);

      if (!match) continue;

      result.client.type = "mobile app";
      result.client.name = variableReplacement(mobileApp.name, match.slice(1));
      result.client.version = formatVersion(variableReplacement(mobileApp.version, match.slice(1)));

      break;
    }

    return result;
  };
}
