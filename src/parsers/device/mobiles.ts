import mobiles from "../../../fixtures/regexes/device/mobiles.json";
import { GenericDeviceResult } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { buildModel } from "../../utils/model";

export default class MobileParser {
  public parse = (userAgent: string): GenericDeviceResult => {
    const result: GenericDeviceResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, mobile] of Object.entries(mobiles)) {
      const match = userAgentParser(mobile.regex, userAgent);

      if (!match) continue;

      result.type = mobile.device || "";
      result.brand = brand;

      if (mobile.model) {
        result.model = buildModel(variableReplacement(mobile.model, match)).trim();
      } else if (mobile.models) {
        for (const model of mobile.models) {
          const modelMatch = userAgentParser(model.regex, userAgent);

          if (!modelMatch) continue;

          result.model = buildModel(variableReplacement(model.model, modelMatch)).trim();

          if (model.device) {
            result.type = model.device;
          }

          if ("brand" in model) {
            result.brand = model.brand || "";
          }
          break;
        }
      }
      break;
    }

    // Sanitize device type
    if (result.type === "tv") {
      result.type = "television";
    }

    if (result.type === "car browser") {
      result.type = "car";
    }

    // Sanitize device brand
    if (result.brand === "Unknown") {
      result.brand = "";
    }

    return result;
  };
}
