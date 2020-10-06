import cars from "../../fixtures/regexes/device/car_browsers.json";
import { GenericDeviceResult } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";

export default class CarParser {
  public parse = (userAgent: string): GenericDeviceResult => {
    const result: GenericDeviceResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, car] of Object.entries(cars)) {
      const match = userAgentParser(car.regex, userAgent);

      if (!match) continue;

      result.type = "car";
      result.brand = brand;

      for (const model of car.models) {
        const match = userAgentParser(model.regex, userAgent);

        if (!match) continue;

        result.model = variableReplacement(model.model, match).trim();
      }

      break;
    }

    return result;
  };
}
