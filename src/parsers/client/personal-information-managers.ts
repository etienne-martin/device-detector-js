import { PersonalInformationManagers } from "../../typings/client";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface PersonalInformationManagerResult {
  type: string;
  name: string;
  version: string;
}

const personalInformationManagers: PersonalInformationManagers = loadRegexes("client/pim");

export default class PersonalInformationManagerParser {
  public parse = (userAgent: string): PersonalInformationManagerResult => {
    const result: PersonalInformationManagerResult = {
      type: "",
      name: "",
      version: ""
    };

    for (const personalInformationManager of personalInformationManagers) {
      const match = userAgentParser(personalInformationManager.regex, userAgent);

      if (!match) continue;

      result.type = "personal information manager";
      result.name = variableReplacement(personalInformationManager.name, match);
      result.version = formatVersion(variableReplacement(personalInformationManager.version, match));
      break;
    }

    return result;
  };
}
