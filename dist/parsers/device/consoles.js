"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const consoles = require("../../../fixtures/regexes/device/consoles.json");
class ConsoleParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                type: "",
                brand: "",
                model: ""
            };
            for (const [brand, gameConsole] of Object.entries(consoles)) {
                const match = user_agent_1.userAgentParser(gameConsole.regex, userAgent);
                if (!match)
                    continue;
                result.type = gameConsole.device;
                result.brand = brand;
                if (gameConsole.model) {
                    result.model = variable_replacement_1.variableReplacement(gameConsole.model, match).trim();
                }
                else if (gameConsole.models) {
                    for (const model of gameConsole.models) {
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
exports.default = ConsoleParser;
