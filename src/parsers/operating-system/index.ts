import operatingSystems from "../../fixtures/regexes/oss.json";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import operatingSystem from "./fixtures/operating-system.json"

export interface OperatingSystemResult {
  name: string;
  version: string;
  platform: "ARM" | "x64" | "x86" | "MIPS" | "SuperH" | "";
}

export type Result = OperatingSystemResult | null;

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const desktopOsArray = ["AmigaOS","IBM","GNU/Linux","Mac","Unix","Windows","BeOS","Chrome OS"];
const shortOsNames = operatingSystem.operatingSystem
const osFamilies = operatingSystem.osFamilies

export default class OperatingSystemParser {
  public static getDesktopOsArray = (): string[] => desktopOsArray;

  public static getOsFamily = (osName: string): string => {
    const osShortName = OperatingSystemParser.getOsShortName(osName);

    for (const [osFamily, shortNames] of Object.entries(osFamilies)) {
      if (shortNames.includes(osShortName)) {
        return osFamily;
      }
    }

    return "";
  };

  private static getOsShortName = (osName: string): string => {
    for (const [shortName, name] of Object.entries(shortOsNames)) {
      if (name === osName) return shortName;
    }

    return "";
  };

  private readonly options: Options = {
    versionTruncation: 1
  };

  constructor(options?: Partial<Options>) {
    this.options = {...this.options, ...options};
  }

  public parse = (userAgent: string): Result => {
    const result: OperatingSystemResult = {
      name: "",
      version: "",
      platform: this.parsePlatform(userAgent)
    };

    for (const operatingSystem of operatingSystems) {
      const match = userAgentParser(operatingSystem.regex, userAgent);

      if (!match) continue;

      result.name = variableReplacement(operatingSystem.name, match);
      result.version = formatVersion(variableReplacement(operatingSystem.version, match), this.options.versionTruncation);

      if (result.name === "lubuntu") {
        result.name = "Lubuntu";
      }

      if (result.name === "debian") {
        result.name = "Debian";
      }

      if (result.name === "YunOS") {
        result.name = "YunOs";
      }

      return result;
    }

    return null;
  };

  private parsePlatform = (userAgent: string) => {
    if (userAgentParser("arm|aarch64|Watch ?OS|Watch1,[12]", userAgent)) {
      return "ARM";
    }

    if (userAgentParser("WOW64|x64|win64|amd64|x86_64", userAgent)) {
      return "x64";
    }

    if (userAgentParser("i[0-9]86|i86pc", userAgent)) {
      return "x86";
    }

    if (userAgentParser("mips", userAgent)) {
      return "MIPS";
    }

    if (userAgentParser("sh4", userAgent)) {
      return "SuperH";
    }

    return "";
  };
}
