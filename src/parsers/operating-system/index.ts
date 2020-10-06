import operatingSystems from "../../fixtures/regexes/oss.json";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";

export interface OperatingSystemResult {
  name: string;
  version: string;
  platform: "ARM" | "x64" | "x86" | "";
}

export type Result = OperatingSystemResult | null;

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const desktopOsArray = ["AmigaOS","IBM","GNU/Linux","Mac","Unix","Windows","BeOS","Chrome OS"];
const shortOsNames = {"AIX":"AIX","AND":"Android","AMG":"AmigaOS","ATV":"Apple TV","ARL":"Arch Linux","BTR":"BackTrack","SBA":"Bada","BEO":"BeOS","BLB":"BlackBerry OS","QNX":"BlackBerry Tablet OS","BMP":"Brew","CES":"CentOS","COS":"Chrome OS","CYN":"CyanogenMod","DEB":"Debian","DFB":"DragonFly","FED":"Fedora","FOS":"Firefox OS","FIR":"Fire OS","BSD":"FreeBSD","GNT":"Gentoo","GTV":"Google TV","HPX":"HP-UX","HAI":"Haiku OS","IRI":"IRIX","INF":"Inferno","KOS":"KaiOS","KNO":"Knoppix","KBT":"Kubuntu","LIN":"GNU\/Linux","LBT":"Lubuntu","VLN":"VectorLinux","MAC":"Mac","MAE":"Maemo","MDR":"Mandriva","SMG":"MeeGo","MCD":"MocorDroid","MIN":"Mint","MLD":"MildWild","MOR":"MorphOS","NBS":"NetBSD","MTK":"MTK \/ Nucleus","WII":"Nintendo","NDS":"Nintendo Mobile","OS2":"OS\/2","T64":"OSF1","OBS":"OpenBSD","ORD":"Ordissimo","PSP":"PlayStation Portable","PS3":"PlayStation","RHT":"Red Hat","ROS":"RISC OS","REM":"Remix OS","RZD":"RazoDroiD","SAB":"Sabayon","SSE":"SUSE","SAF":"Sailfish OS","SLW":"Slackware","SOS":"Solaris","SYL":"Syllable","SYM":"Symbian","SYS":"Symbian OS","S40":"Symbian OS Series 40","S60":"Symbian OS Series 60","SY3":"Symbian^3","TDX":"ThreadX","TIZ":"Tizen","UBT":"Ubuntu","WTV":"WebTV","WIN":"Windows","WCE":"Windows CE","WIO":"Windows IoT","WMO":"Windows Mobile","WPH":"Windows Phone","WRT":"Windows RT","XBX":"Xbox","XBT":"Xubuntu","YNS":"YunOs","IOS":"iOS","POS":"palmOS","WOS":"webOS"};
const osFamilies = {"Android":["AND","CYN","FIR","REM","RZD","MLD","MCD","YNS"],"AmigaOS":["AMG","MOR"],"Apple TV":["ATV"],"BlackBerry":["BLB","QNX"],"Brew":["BMP"],"BeOS":["BEO","HAI"],"Chrome OS":["COS"],"Firefox OS":["FOS","KOS"],"Gaming Console":["WII","PS3"],"Google TV":["GTV"],"IBM":["OS2"],"iOS":["IOS"],"RISC OS":["ROS"],"GNU\/Linux":["LIN","ARL","DEB","KNO","MIN","UBT","KBT","XBT","LBT","FED","RHT","VLN","MDR","GNT","SAB","SLW","SSE","CES","BTR","SAF","ORD"],"Mac":["MAC"],"Mobile Gaming Console":["PSP","NDS","XBX"],"Real-time OS":["MTK","TDX"],"Other Mobile":["WOS","POS","SBA","TIZ","SMG","MAE"],"Symbian":["SYM","SYS","SY3","S60","S40"],"Unix":["SOS","AIX","HPX","BSD","NBS","OBS","DFB","SYL","IRI","T64","INF"],"WebTV":["WTV"],"Windows":["WIN"],"Windows Mobile":["WPH","WMO","WCE","WRT","WIO"]};

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
    if (userAgentParser("arm", userAgent)) {
      return "ARM";
    }

    if (userAgentParser("WOW64|x64|win64|amd64|x86_64", userAgent)) {
      return "x64";
    }

    if (userAgentParser("i[0-9]86|i86pc", userAgent)) {
      return "x86";
    }

    return "";
  };
}
