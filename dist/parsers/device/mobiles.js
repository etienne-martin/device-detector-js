"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const model_1 = require("../../utils/model");
const mobiles = require("../../../fixtures/regexes/device/mobiles.json");
class MobileParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, mobile] of Object.entries(mobiles)) {
                const match = user_agent_1.userAgentParser(mobile.regex, userAgent);
                if (!match)
                    continue;
                result.type = mobile.device;
                result.brand = brand;
                if (mobile.model) {
                    result.model = model_1.buildModel(variable_replacement_1.variableReplacement(mobile.model, match)).trim();
                }
                else if (mobile.models) {
                    for (const model of mobile.models) {
                        const modelMatch = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!modelMatch)
                            continue;
                        result.model = model_1.buildModel(variable_replacement_1.variableReplacement(model.model, modelMatch)).trim();
                        if (model.device) {
                            result.type = model.device;
                        }
                        if (model.brand) {
                            result.brand = model.brand;
                        }
                        break;
                    }
                }
                break;
            }
            // Sanitize device type
            if (result.type === "tv") {
                result.type = result.type.replace("tv", "television");
            }
            // Sanitize device brand
            if (result.brand === "Unknown") {
                result.brand = "";
            }
            return result;
        };
    }
}
exports.default = MobileParser;
