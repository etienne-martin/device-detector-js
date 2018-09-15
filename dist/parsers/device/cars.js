"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const yaml_loader_1 = require("../../utils/yaml-loader");
const cars = yaml_loader_1.loadRegexes("device/car_browsers");
class CarParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, car] of Object.entries(cars)) {
                const match = user_agent_1.userAgentParser(car.regex, userAgent);
                if (!match)
                    continue;
                result.type = "car";
                result.brand = brand;
                if (car.model) {
                    result.model = variable_replacement_1.variableReplacement(car.model, match).trim();
                }
                break;
            }
            return result;
        };
    }
}
exports.default = CarParser;
