"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const yaml_loader_1 = require("../../utils/yaml-loader");
const cameras = yaml_loader_1.loadRegexes("device/cameras");
class CameraParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, camera] of Object.entries(cameras)) {
                const match = user_agent_1.userAgentParser(camera.regex, userAgent);
                if (!match)
                    continue;
                result.type = "camera";
                result.brand = brand;
                if (camera.model) {
                    result.model = variable_replacement_1.variableReplacement(camera.model, match).trim();
                }
                else if (camera.models) {
                    for (const model of camera.models) {
                        const modelMatch = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!modelMatch)
                            continue;
                        result.model = variable_replacement_1.variableReplacement(model.model, modelMatch).trim();
                        break;
                    }
                }
                break;
            }
            return result;
        };
    }
}
exports.default = CameraParser;
