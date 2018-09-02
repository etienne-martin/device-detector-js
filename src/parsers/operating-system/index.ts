import { OperatingSystems } from "../../typings/operating-system";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface OperatingSystemResult {
  name: string;
  version: string;
}

type Result = OperatingSystemResult | null;

const operatingSystems: OperatingSystems = loadRegexes("oss");

export default class OperatingSystemParser {
  public parse = (userAgent: string): Result => {
    const result: Result = {
      name: "",
      version: ""
    };

    for (const operatingSystem of operatingSystems) {
      const match = userAgentParser(operatingSystem.regex, userAgent);

      if (!match) continue;

      result.name = operatingSystem.name;
      result.version = operatingSystem.version;

      return result;
    }

    return null;
  };
}
