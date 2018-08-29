import { Mobiles } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface MobileResult {
  type: string;
  brand: string;
  model: string;
}

let mobiles: Mobiles;

const buildModel = (model: string) => {
  model = model.replace(/_/g, " ");
  model = model.replace(RegExp(" TD$", "i"), "");

  if (model === "Build") {
    return "";
  }

  return model;
};

export default class MobileParser {
  private readonly mobiles: Mobiles;

  constructor() {
    this.mobiles = mobiles || loadRegexes("device/mobiles");

    if (!mobiles) {
      mobiles = this.mobiles;
    }
  }

  public parse = (userAgent: string): MobileResult => {
    const result: MobileResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, mobile] of Object.entries(this.mobiles)) {
      const match = userAgentParser(mobile.regex, userAgent);

      if (!match) continue;

      result.type = mobile.device;
      result.brand = brand;

      if (mobile.model) {
        result.model = buildModel(variableReplacement(mobile.model, match)).trim();
      } else if (mobile.models) {
        for (const model of mobile.models) {
          const modelMatch = userAgentParser(model.regex, userAgent);

          if (!modelMatch) continue;

          result.model = buildModel(variableReplacement(model.model, modelMatch)).trim();

          if (result.model === "One Touch A3 XL") {
            console.log("TATATATATA:");
            console.log(result);
            console.log(userAgent);
            console.log(mobile.regex);
            console.log(model.regex);
          }

          break;
        }
      }
      break;
    }

    return result;
  };
}
