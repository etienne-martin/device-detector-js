import { Consoles } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface ConsoleResult {
  type: string;
  brand: string;
  model: string;
}

let consoles: Consoles;

export default class ConsoleParser {
  private readonly consoles: Consoles;

  constructor() {
    this.consoles = consoles || loadRegexes("device/consoles");

    if (!consoles) {
      consoles = this.consoles;
    }
  }

  public parse = (userAgent: string): ConsoleResult => {
    const result: ConsoleResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, gameConsole] of Object.entries(this.consoles)) {
      const match = userAgentParser(gameConsole.regex, userAgent);

      if (!match) continue;

      result.type = gameConsole.device;
      result.brand = brand;

      if (gameConsole.model) {
        result.model = variableReplacement(gameConsole.model, match).trim();
      } else if (gameConsole.models) {
        for (const model of gameConsole.models) {
          const modelMatch = userAgentParser(model.regex, userAgent);

          if (!modelMatch) continue;

          result.model = variableReplacement(model.model, modelMatch).trim();
          break;
        }
      }
      break;
    }

    return result;
  };
}
