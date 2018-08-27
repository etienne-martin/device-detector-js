import { MobileApps } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";
import {loadYaml} from "../utils/yaml-loader";

interface MobileAppsResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const mobileApps: MobileApps = loadYaml("client/mobile_apps");

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
      result.client.name = variableReplacement(mobileApp.name, match);
      result.client.version = formatVersion(variableReplacement(mobileApp.version, match));

      break;
    }

    return result;
  };
}
