import * as YAML from "yamljs";
import * as path from "path";
import { Browsers, BrowserEngines } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";

interface Result {
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

export default class BrowserDetector {
  public detect = (userAgent: string) => {
    const result: Result = {
      client: {
        type: "",
        name: "",
        version: "",
        engine: ""
      }
    };

    for (const browser of browsers) {
      // only match if useragent begins with given regex or there is no letter before it
      const regex = `(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${browser.regex})`;
      const match = RegExp(regex, "i").exec(userAgent);

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
