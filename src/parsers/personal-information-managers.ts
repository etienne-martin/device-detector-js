import * as YAML from "yamljs";
import * as path from "path";
import { PersonalInformationManagers } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";

interface PersonalInformationManagerResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const root = path.resolve(__dirname);
const personalInformationManagers: PersonalInformationManagers = YAML.load(root + "/../../node_modules/device-detector/regexes/client/pim.yml");

export default class PersonalInformationManagerParser {
  public detect = (userAgent: string): PersonalInformationManagerResult => {
    const result: PersonalInformationManagerResult = {
      client: {
        type: "",
        name: "",
        version: ""
      }
    };

    for (const personalInformationManager of personalInformationManagers) {
      const match = userAgentParser(personalInformationManager.regex, userAgent);

      if (!match) continue;

      result.client.type = "media player";
      result.client.name = variableReplacement(personalInformationManager.name, match.slice(1));
      result.client.version = formatVersion(variableReplacement(personalInformationManager.version, match.slice(1)));

      break;
    }

    return result;
  };
}
