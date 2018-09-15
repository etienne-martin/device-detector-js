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

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const mobileApps: MobileApps = loadRegexes("client/mobile_apps");

export default class MobileAppParser {
  private readonly options: Options = {
    versionTruncation: 1
  };

  constructor(options?: Partial<Options>) {
    this.options = {...this.options, ...options};
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
      result.version = formatVersion(variableReplacement(mobileApp.version, match), this.options.versionTruncation);
      break;
    }

    return result;
  };
}
