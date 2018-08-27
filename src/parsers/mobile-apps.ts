import * as YAML from "yamljs";
import * as path from "path";
import { MobileApps } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";

interface MobileAppsResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const root = path.resolve(__dirname);
const mobileApps: MobileApps = YAML.load(root + "/../../node_modules/device-detector/regexes/client/mobile_apps.yml");

export default class MobileAppsParser {
  public detect = (userAgent: string): MobileAppsResult => {
    const result: MobileAppsResult = {
      client: {
        type: "",
        name: "",
        version: ""
      }
    };

    for (const mobileApp of mobileApps) {
      // only match if useragent begins with given regex or there is no letter before it
      const regex = `(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${mobileApp.regex})`;
      const match = RegExp(regex, "i").exec(userAgent);

      if (!match) continue;

      result.client.type = "mobile app";
      result.client.name = variableReplacement(mobileApp.name, match.slice(1));
      result.client.version = formatVersion(variableReplacement(mobileApp.version, match.slice(1)));

      break;
    }

    return result;
  };
}
