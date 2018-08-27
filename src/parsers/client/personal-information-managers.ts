import { PersonalInformationManagers } from "../../typings/device-detector";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import {loadYaml} from "../../utils/yaml-loader";

interface PersonalInformationManagerResult {
  client: {
    type: string;
    name: string;
    version: string;
  }
}

const personalInformationManagers: PersonalInformationManagers = loadYaml("client/pim");

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

      result.client.type = "personal information manager";
      result.client.name = variableReplacement(personalInformationManager.name, match);
      result.client.version = formatVersion(variableReplacement(personalInformationManager.version, match));

      break;
    }

    return result;
  };
}
