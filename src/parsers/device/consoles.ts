import consoles from "../../fixtures/regexes/device/consoles.json";
import { GenericDeviceResult } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";

export default class ConsoleParser {
  public parse = (userAgent: string): GenericDeviceResult => {
    const result: GenericDeviceResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, gameConsole] of Object.entries(consoles)) {
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
