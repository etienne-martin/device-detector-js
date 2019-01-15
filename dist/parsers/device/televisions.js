"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const model_1 = require("../../utils/model");
const televisions = require("../../../fixtures/regexes/device/televisions.json");
class TelevisionParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            if (!this.isHbbTv(userAgent))
                return result;
            result.type = "television";
            for (const [brand, television] of Object.entries(televisions)) {
                const match = user_agent_1.userAgentParser(television.regex, userAgent);
                if (!match)
                    continue;
                result.brand = brand;
                if (television.model) {
                    result.model = model_1.buildModel(variable_replacement_1.variableReplacement(television.model, match)).trim();
                }
                else if (television.models) {
                    for (const model of television.models) {
                        const modelMatch = user_agent_1.userAgentParser(model.regex, userAgent);
                        if (!modelMatch)
                            continue;
                        result.model = model_1.buildModel(variable_replacement_1.variableReplacement(model.model, modelMatch)).trim();
                        break;
                    }
                }
                break;
            }
            return result;
        };
        this.isHbbTv = (userAgent) => {
            return user_agent_1.userAgentParser("HbbTV\/([1-9]{1}(?:\.[0-9]{1}){1,2})", userAgent);
        };
    }
}
exports.default = TelevisionParser;
