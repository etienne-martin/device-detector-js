import { Libraries } from "../../typings/client";
import { formatVersion } from "../../utils/version";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface LibraryResult {
  type: string;
  name: string;
  version: string;
  url: string;
}

let libraries: Libraries;

export default class LibraryParser {
  private readonly libraries: Libraries;

  constructor() {
    this.libraries = libraries || loadRegexes("client/libraries");

    if (!libraries) {
      libraries = this.libraries;
    }
  }

  public parse = (userAgent: string): LibraryResult => {
    const result: LibraryResult = {
      type: "",
      name: "",
      version: "",
      url: ""
    };

    for (const library of this.libraries) {
      const match = userAgentParser(library.regex, userAgent);

      if (!match) continue;

      result.type = "library";
      result.name = variableReplacement(library.name, match);
      result.version = formatVersion(variableReplacement(library.version, match));
      result.url = library.url || "";

      break;
    }

    return result;
  };
}
