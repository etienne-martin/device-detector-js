import notebooks from "../../fixtures/regexes/device/notebooks.json";
import { GenericDeviceResult } from "../../typings/device"
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import {buildModel} from "../../utils/model";

export default class NotebooksParser {
  public parse = (userAgent: string): GenericDeviceResult => {
    const result: GenericDeviceResult = {
      type: "",
      brand: "",
      model: ""
    };

    if (!userAgentParser("FBMD/", userAgent)) {
      return result
    }

    for (const [brand, notebook] of Object.entries(notebooks)) {
      const match = userAgentParser(notebook.regex, userAgent);

      if (!match) continue;

      result.type = "desktop";
      result.brand = brand;

      if ("model" in notebook && notebook.model) {
        result.model = buildModel(variableReplacement(notebook.model, match)).trim();
      } else if ("models" in notebook && notebook.models){
        for (const model of notebook.models) {
          const match = userAgentParser(model.regex, userAgent);

          if (!match) continue;

          result.model = variableReplacement(model.model, match).trim();
        }
      }

      break;
    }

    return result;
  };
}
