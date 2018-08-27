import * as YAML from "yamljs";
import * as path from "path";
import { Libraries } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";

interface LibrariesResult {
  client: {
    type: string;
    name: string;
    version: string;
    url?: string;
  }
}

const root = path.resolve(__dirname);
const libraries: Libraries = YAML.load(root + "/../../node_modules/device-detector/regexes/client/libraries.yml");

export default class LibraryParser {
  public detect = (userAgent: string): LibrariesResult => {
    const result: LibrariesResult = {
      client: {
        type: "",
        name: "",
        version: ""
      }
    };

    for (const library of libraries) {
      const match = userAgentParser(library.regex, userAgent);

      if (!match) continue;

      result.client.type = "library";
      result.client.name = variableReplacement(library.name, match.slice(1));
      result.client.version = formatVersion(variableReplacement(library.version, match.slice(1)));

      if (library.url) {
        result.client.url = library.url || "";
      }

      break;
    }

    return result;
  };
}
