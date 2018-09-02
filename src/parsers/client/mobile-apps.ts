import { MobileApps } from "../../typings/client";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface MobileAppResult {
  type: string;
  name: string;
  version: string;
}

const mobileApps: MobileApps = loadRegexes("client/mobile_apps");

export default class MobileAppParser {
  public parse = (userAgent: string): MobileAppResult => {
    const result: MobileAppResult = {
      type: "",
      name: "",
      version: ""
    };

    for (const mobileApp of mobileApps) {
      const match = userAgentParser(mobileApp.regex, userAgent);

      if (!match) continue;

      result.type = "mobile app";
      result.name = variableReplacement(mobileApp.name, match);
      result.version = formatVersion(variableReplacement(mobileApp.version, match));

      break;
    }

    return result;
  };
}
