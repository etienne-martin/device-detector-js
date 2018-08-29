import { Cars } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface CarResult {
  type: string;
  brand: string;
  model: string;
}

let cars: Cars;

export default class CarParser {
  private readonly cars: Cars;

  constructor() {
    this.cars = cars || loadRegexes("device/car_browsers");

    if (!cars) {
      cars = this.cars;
    }
  }

  public parse = (userAgent: string): CarResult => {
    const result: CarResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, car] of Object.entries(this.cars)) {
      const match = userAgentParser(car.regex, userAgent);

      if (!match) continue;

      result.type = "car";
      result.brand = brand;

      if (car.model) {
        result.model = variableReplacement(car.model, match).trim();
      } else if (car.models) {
        for (const model of car.models) {
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
