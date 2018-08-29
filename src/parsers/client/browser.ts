import { Browsers, BrowserEngines } from "../../typings/client";
import { formatVersion, parseBrowserEngineVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface BrowserResult {
  type: string;
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
}

let browsers: Browsers;
let browserEngines: BrowserEngines;

export default class BrowserParser {
  private readonly browsers: Browsers;
  private readonly browserEngines: BrowserEngines;

  constructor() {
    this.browsers = browsers || loadRegexes("client/browsers");
    this.browserEngines = browserEngines || loadRegexes("client/browser_engine");

    if (!browsers) {
      browsers = this.browsers;
      browserEngines = this.browserEngines;
    }
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

      const version = formatVersion(variableReplacement(browser.version, match));
      const shortVersion = version && parseFloat(version) || "";

      if (browser.engine) {
        result.engine = browser.engine.default;

        if (browser.engine && browser.engine.versions && shortVersion) {
          for (const [versionThreshold, engineByVersion] of Object.entries(browser.engine.versions)) {
            if (parseFloat(versionThreshold) <= shortVersion) {
              result.engine = engineByVersion;
              break;
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

    result.engineVersion = formatVersion(parseBrowserEngineVersion(userAgent, result.engine));

    return result;
  };
}
