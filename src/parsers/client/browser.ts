import { Browsers, BrowserEngines } from "../../typings/device-detector";
import { formatVersion, parseBrowserEngineVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

interface BrowserResult {
  client: {
    type: string;
    name: string;
    version: string;
    engine: string;
    engineVersion: string;
  }
}

const browsers: Browsers = loadRegexes("client/browsers");
const browserEngines: BrowserEngines = loadRegexes("client/browser_engine");

export default class BrowserParser {
  public detect = (userAgent: string): BrowserResult => {
    const result: BrowserResult = {
      client: {
        type: "",
        name: "",
        version: "",
        engine: "",
        engineVersion: ""
      }
    };

    for (const browser of browsers) {
      const match = userAgentParser(browser.regex, userAgent);

      if (!match) continue;

      const version = formatVersion(variableReplacement(browser.version, match));
      const shortVersion = version && parseFloat(version) || "";
      let engine = "";

      if (browser.engine) {
        engine = browser.engine.default;

        if (browser.engine.versions && shortVersion) {
          for (const [versionThreshold, engineByVersion] of Object.entries(browser.engine.versions)) {
            if (parseFloat(versionThreshold) <= shortVersion) {
              engine = engineByVersion;
              break;
            }
          }
        }
      }

      result.client.type = "browser";
      result.client.name = variableReplacement(browser.name, match);
      result.client.version = version;
      result.client.engine = engine;

      break;
    }

    if (!result.client.engine) {
      for (const browserEngine of browserEngines) {
        const match = RegExp(browserEngine.regex, "i").exec(userAgent);

        if (!match) continue;

        result.client.engine = browserEngine.name;

        break;
      }
    }

    result.client.engineVersion = formatVersion(parseBrowserEngineVersion(userAgent, result.client.engine));

    return result;
  };
}
