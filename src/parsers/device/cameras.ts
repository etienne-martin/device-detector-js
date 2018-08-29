import { Cameras } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface CameraResult {
  type: string;
  brand: string;
  model: string;
}

let cameras: Cameras;

export default class CameraParser {
  private readonly cameras: Cameras;

  constructor() {
    this.cameras = cameras || loadRegexes("device/cameras");

    if (!cameras) {
      cameras = this.cameras;
    }
  }

  public parse = (userAgent: string): CameraResult => {
    const result: CameraResult = {
      type: "",
      brand: "",
      model: ""
    };

    for (const [brand, camera] of Object.entries(this.cameras)) {
      const match = userAgentParser(camera.regex, userAgent);

      if (!match) continue;

      result.type = "camera";
      result.brand = brand;

      if (camera.model) {
        result.model = camera.model;
      } else if (camera.models) {
        for (const model of camera.models) {
          const modelMatch = userAgentParser(model.regex, userAgent);

          if (!modelMatch) continue;

          result.model = variableReplacement(model.model, modelMatch);
          break;
        }
      }
      break;
    }

    return result;
  };
}
