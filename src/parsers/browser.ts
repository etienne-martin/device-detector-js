import * as YAML from "yamljs";
import * as path from "path";
import { Browsers, BrowserEngines } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import {userAgentParser} from "../utils/user-agent";

interface BrowserResult {
  client: {
    type: string;
    name: string;
    version: string;
    engine: string;
  }
}

const root = path.resolve(__dirname);
const browsers: Browsers = YAML.load(root + "/../../node_modules/device-detector/regexes/client/browsers.yml");
const browserEngines: BrowserEngines = YAML.load(root + "/../../node_modules/device-detector/regexes/client/browser_engine.yml");

export default class BrowserParser {
  public detect = (userAgent: string): BrowserResult => {
    const result: BrowserResult = {
      client: {
        type: "",
        name: "",
        version: "",
        engine: ""
      }
    };

    for (const browser of browsers) {
      const match = userAgentParser(browser.regex, userAgent);

      if (!match) continue;

      const version = formatVersion(variableReplacement(browser.version, match.slice(1)));
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
      result.client.name = variableReplacement(browser.name, match.slice(1));
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

    return result;
  };
}
