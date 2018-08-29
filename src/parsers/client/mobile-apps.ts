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

let mobileApps: MobileApps;

export default class MobileAppParser {
  private readonly mobileApps: MobileApps;

  constructor() {
    this.mobileApps = mobileApps || loadRegexes("client/mobile_apps");

    if (!mobileApps) {
      mobileApps = this.mobileApps;
    }
  }

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
