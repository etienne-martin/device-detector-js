import { Televisions } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface TelevisionResult {
  type: string; // TODO: maybe add better typing, ie: add all possible string values
  brand: string;
  model: string;
}

let televisions: Televisions;

// TODO: move to the utils folder
const buildModel = (model: string) => {
  model = model.replace(/_/g, " ");
  model = model.replace(RegExp(" TD$", "i"), "");

  if (model === "Build") {
    return "";
  }

  return model;
};

export default class TelevisionParser {
  private readonly televisions: Televisions;

  constructor() {
    this.televisions = televisions || loadRegexes("device/televisions");

    if (!televisions) {
      televisions = this.televisions;
    }
  }

  public parse = (userAgent: string): TelevisionResult => {
    const result: TelevisionResult = {
      type: "",
      brand: "",
      model: ""
    };

    if (!this.isHbbTv(userAgent)) return result;

    result.type = "television";

    for (const [brand, television] of Object.entries(this.televisions)) {
      const match = userAgentParser(television.regex, userAgent);

      if (!match) continue;

      result.brand = brand;

      if (television.model) {
        result.model = buildModel(variableReplacement(television.model, match)).trim();
      } else if (television.models) {
        for (const model of television.models) {
          const modelMatch = userAgentParser(model.regex, userAgent);

          if (!modelMatch) continue;

          result.model = buildModel(variableReplacement(model.model, modelMatch)).trim();
          break;
        }
      }
      break;
    }

    return result;
  };

  private isHbbTv = (userAgent: string) => {
    return userAgentParser("HbbTV\/([1-9]{1}(?:\.[0-9]{1}){1,2})", userAgent);
  };
}
