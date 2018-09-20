"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const personalInformationManagers = require("../../../php_modules/device-detector/regexes/client/pim.json");
class PersonalInformationManagerParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                type: "",
                name: "",
                version: ""
            };
            for (const personalInformationManager of personalInformationManagers) {
                const match = user_agent_1.userAgentParser(personalInformationManager.regex, userAgent);
                if (!match)
                    continue;
                result.type = "personal information manager";
                result.name = variable_replacement_1.variableReplacement(personalInformationManager.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(personalInformationManager.version, match), this.options.versionTruncation);
                break;
            }
            return result;
        };
        this.options = Object.assign({}, this.options, options);
    }
}
exports.default = PersonalInformationManagerParser;
