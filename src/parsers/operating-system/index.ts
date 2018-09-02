import { OperatingSystems } from "../../typings/operating-system";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface OperatingSystemResult {
  name: string;
  version: string;
}

type Result = OperatingSystemResult | null;

let operatingSystems: OperatingSystems;

export default class OperatingSystemParser {
  private readonly operatingSystems: OperatingSystems;

  constructor() {
    this.operatingSystems = operatingSystems || loadRegexes("oss");

    if (!operatingSystems) {
      operatingSystems = this.operatingSystems;
    }
  }

  public parse = (userAgent: string): Result => {
    const result: Result = {
      name: "",
      version: ""
    };

    for (const operatingSystem of this.operatingSystems) {
      const match = userAgentParser(operatingSystem.regex, userAgent);

      if (!match) continue;

      result.name = operatingSystem.name;
      result.version = operatingSystem.version;

      return result;
    }

    return null;
  };
}
