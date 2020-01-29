import { Browsers, BrowserEngines } from "../../typings/client";
import { formatVersion, parseBrowserEngineVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";

export interface BrowserResult {
  type: string;
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
}

interface Options {
  versionTruncation: 0 | 1 | 2 | 3 | null;
}

const browsers: Browsers = require("../../../fixtures/regexes/client/browsers.json");
const browserEngines: BrowserEngines = require("../../../fixtures/regexes/client/browser_engine.json");
const availableBrowsers = {"2B":"2345 Browser", "36":"360 Phone Browser", "3B":"360 Browser", "AA":"Avant Browser", "AB":"ABrowse", "AF":"ANT Fresco", "AG":"ANTGalio", "AL":"Aloha Browser", "AH":"Aloha Browser Lite", "AM":"Amaya", "AO":"Amigo", "AN":"Android Browser", "AD":"AOL Shield", "AR":"Arora", "AV":"Amiga Voyager", "AW":"Amiga Aweb", "AT":"Atomic Web Browser", "AS":"Avast Secure Browser", "VG":"AVG Secure Browser", "BA":"Beaker Browser", "BM":"Beamrise", "BB":"BlackBerry Browser", "BD":"Baidu Browser", "BS":"Baidu Spark", "BI":"Basilisk", "BE":"Beonex", "BH":"BlackHawk", "BJ":"Bunjalloo", "BL":"B-Line", "BR":"Brave", "BK":"BriskBard", "BX":"BrowseX", "CA":"Camino", "CL":"CCleaner", "CC":"Coc Coc", "CD":"Comodo Dragon", "C1":"Coast", "CX":"Charon", "CE":"CM Browser", "CF":"Chrome Frame", "HC":"Headless Chrome", "CH":"Chrome", "CI":"Chrome Mobile iOS", "CK":"Conkeror", "CM":"Chrome Mobile", "CN":"CoolNovo", "CO":"CometBird", "CB":"COS Browser", "CP":"ChromePlus", "CR":"Chromium", "CY":"Cyberfox", "CS":"Cheshire", "CT":"Crusta", "CU":"Cunaguaro", "CV":"Chrome Webview", "DB":"dbrowser", "DE":"Deepnet Explorer", "DT":"Delta Browser", "DF":"Dolphin", "DO":"Dorado", "DL":"Dooble", "DI":"Dillo", "DD":"DuckDuckGo Privacy Browser", "EC":"Ecosia", "EI":"Epic", "EL":"Elinks", "EB":"Element Browser", "EZ":"eZ Browser", "EU":"EUI Browser", "EP":"GNOME Web", "ES":"Espial TV Browser", "FA":"Falkon", "FX":"Faux Browser", "F1":"Firefox Mobile iOS", "FB":"Firebird", "FD":"Fluid", "FE":"Fennec", "FF":"Firefox", "FK":"Firefox Focus", "FY":"Firefox Reality", "FR":"Firefox Rocket", "FL":"Flock", "FM":"Firefox Mobile", "FW":"Fireweb", "FN":"Fireweb Navigator", "FU":"FreeU", "GA":"Galeon", "GE":"Google Earth", "HA":"Hawk Turbo Browser", "HO":"hola! Browser", "HJ":"HotJava", "HU":"Huawei Browser", "IB":"IBrowse", "IC":"iCab", "I2":"iCab Mobile", "I1":"Iridium", "I3":"Iron Mobile", "I4":"IceCat", "ID":"IceDragon", "IV":"Isivioo", "IW":"Iceweasel", "IE":"Internet Explorer", "IM":"IE Mobile", "IR":"Iron", "JS":"Jasmine", "JI":"Jig Browser", "JO":"Jio Browser", "KB":"K.Browser", "KI":"Kindle Browser", "KM":"K-meleon", "KO":"Konqueror", "KP":"Kapiko", "KN":"Kinza", "KW":"Kiwi", "KY":"Kylo", "KZ":"Kazehakase", "LB":"Cheetah Browser", "LF":"LieBaoFast", "LG":"LG Browser", "LI":"Links", "LO":"Lovense Browser", "LU":"LuaKit", "LS":"Lunascape", "LX":"Lynx", "M1":"mCent", "MB":"MicroB", "MC":"NCSA Mosaic", "MZ":"Meizu Browser", "ME":"Mercury", "MF":"Mobile Safari", "MI":"Midori", "MO":"Mobicip", "MU":"MIUI Browser", "MS":"Mobile Silk", "MN":"Minimo", "MT":"Mint Browser", "MX":"Maxthon", "NB":"Nokia Browser", "NO":"Nokia OSS Browser", "NV":"Nokia Ovi Browser", "NX":"Nox Browser", "NE":"NetSurf", "NF":"NetFront", "NL":"NetFront Life", "NP":"NetPositive", "NS":"Netscape", "NT":"NTENT Browser", "OC":"Oculus Browser", "O1":"Opera Mini iOS", "OB":"Obigo", "OD":"Odyssey Web Browser", "OF":"Off By One", "OE":"ONE Browser", "OX":"Opera GX", "OG":"Opera Neon", "OH":"Opera Devices", "OI":"Opera Mini", "OM":"Opera Mobile", "OP":"Opera", "ON":"Opera Next", "OO":"Opera Touch", "OS":"Ordissimo", "OR":"Oregano", "OY":"Origyn Web Browser", "OV":"Openwave Mobile Browser", "OW":"OmniWeb", "OT":"Otter Browser", "PL":"Palm Blazer", "PM":"Pale Moon", "PP":"Oppo Browser", "PR":"Palm Pre", "PU":"Puffin", "PW":"Palm WebPro", "PA":"Palmscape", "PX":"Phoenix", "PO":"Polaris", "PT":"Polarity", "PS":"Microsoft Edge", "Q1":"QQ Browser Mini", "QQ":"QQ Browser", "QT":"Qutebrowser", "QZ":"QupZilla", "QM":"Qwant Mobile", "QW":"QtWebEngine", "RE":"Realme Browser", "RK":"Rekonq", "RM":"RockMelt", "SB":"Samsung Browser", "SA":"Sailfish Browser", "SC":"SEMC-Browser", "SE":"Sogou Explorer", "SF":"Safari", "SW":"SalamWeb", "SH":"Shiira", "S1":"SimpleBrowser", "SK":"Skyfire", "SS":"Seraphic Sraf", "SL":"Sleipnir", "SN":"Snowshoe", "SO":"Sogou Mobile Browser", "S2":"Splash", "SI":"Sputnik Browser", "SR":"Sunrise", "SP":"SuperBird", "SU":"Super Fast Browser", "S0":"START Internet Browser", "ST":"Streamy", "SX":"Swiftfox", "SZ":"Seznam Browser", "TO":"t-online.de Browser", "TA":"Tao Browser", "TF":"TenFourFox", "TB":"Tenta Browser", "TZ":"Tizen Browser", "TS":"TweakStyle", "UB":"UBrowser", "UC":"UC Browser", "UM":"UC Browser Mini", "UT":"UC Browser Turbo", "UZ":"Uzbl", "VI":"Vivaldi", "VV":"vivo Browser", "VB":"Vision Mobile Browser", "WI":"Wear Internet Browser", "WP":"Web Explorer", "WE":"WebPositive", "WF":"Waterfox", "WH":"Whale Browser", "WO":"wOSBrowser", "WT":"WeTab Browser", "YA":"Yandex Browser", "YL":"Yandex Browser Lite", "XI":"Xiino"};
const browserFamilies = {"Android Browser":["AN", "MU"], "BlackBerry Browser":["BB"], "Baidu":["BD", "BS"], "Amiga":["AV", "AW"], "Chrome":["CH", "BA", "BR", "CC", "CD", "CM", "CI", "CF", "CN", "CR", "CP", "DD", "IR", "RM", "AO", "TS", "VI", "PT", "AS", "TB", "AD", "SB", "WP", "I3", "CV", "WH", "SZ", "QW", "LF", "KW", "2B", "CE", "EC", "MT", "MS", "HA", "OC", "MZ", "BM", "KN", "SW", "M1", "FA", "TA", "AH", "CL", "SU", "EU", "UB", "LO", "VG"], "Firefox":["FF", "FE", "FM", "SX", "FB", "PX", "MB", "EI", "WF", "CU", "TF", "QM", "FR", "I4", "GZ", "MO", "F1", "BI", "MN", "BH", "TO", "OS", "FY"], "Internet Explorer":["IE", "IM", "PS"], "Konqueror":["KO"], "NetFront":["NF"], "NetSurf":["NE"], "Nokia Browser":["NB", "NO", "NV", "DO"], "Opera":["OP", "OM", "OI", "ON", "OO", "OG", "OH", "O1", "OX"], "Safari":["SF", "MF", "SO"], "Sailfish Browser":["SA"]};
const mobileOnlyBrowsers = ["36", "OC", "PU", "SK", "MF", "OI", "OM", "DD", "DB", "ST", "BL", "IV", "FM", "C1", "AL", "SA", "SB", "FR", "WP", "HA", "NX", "HU", "VV", "RE", "CB", "MZ", "UM", "FK", "FX", "WI", "MN", "M1", "AH", "SU", "EU", "EZ", "UT", "DT", "S0"];

export default class BrowserParser {
  public static getBrowserShortName = (browserName: string): string => {
    for (const [shortName, name] of Object.entries(availableBrowsers)) {
      if (name === browserName) {
        return shortName;
      }
    }

    return "";
  };

  public static getBrowserFamily = (browserName: string) => {
    const browserShortName = BrowserParser.getBrowserShortName(browserName);

    for (const [browserFamily, browserLabels] of Object.entries(browserFamilies)) {
      if (browserLabels.includes(browserShortName)) return browserFamily;
    }

    return "";
  };

  public static isMobileOnlyBrowser = (browserName: string) => {
    return mobileOnlyBrowsers.includes(BrowserParser.getBrowserShortName(browserName));
  };

  private readonly options: Options = {
    versionTruncation: 1
  };

  constructor(options?: Partial<Options>) {
    this.options = {...this.options, ...options};
  }

  public parse = (userAgent: string): BrowserResult => {
    const result: BrowserResult = {
      type: "",
      name: "",
      version: "",
      engine: "",
      engineVersion: ""
    };

    for (const browser of browsers) {
      const match = userAgentParser(browser.regex, userAgent);

      if (!match) continue;

      const vrpVersion = variableReplacement(browser.version, match);
      const version = formatVersion(vrpVersion, this.options.versionTruncation);
      const shortVersion = version && parseFloat(formatVersion(vrpVersion, 1)) || "";

      if (browser.engine) {
        result.engine = browser.engine.default;

        if (browser.engine && browser.engine.versions && shortVersion) {
          const sortedEngineVersions = Object.entries(browser.engine.versions).sort((a, b) => {
            return parseFloat(a[0]) > parseFloat(b[0]) ? 1 : -1;
          });

          for (const [versionThreshold, engineByVersion] of sortedEngineVersions) {
            if (parseFloat(versionThreshold) <= shortVersion) {
              result.engine = engineByVersion;
            }
          }
        }
      }

      result.type = "browser";
      result.name = variableReplacement(browser.name, match);
      result.version = version;
      break;
    }

    if (!result.engine) {
      for (const browserEngine of browserEngines) {
        const match = RegExp(browserEngine.regex, "i").exec(userAgent);

        if (!match) continue;

        result.engine = browserEngine.name;
        break;
      }
    }

    result.engineVersion = formatVersion(parseBrowserEngineVersion(userAgent, result.engine), this.options.versionTruncation);

    return result;
  };
}
