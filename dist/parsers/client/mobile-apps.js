"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const yaml_loader_1 = require("../../utils/yaml-loader");
const mobileApps = yaml_loader_1.loadRegexes("client/mobile_apps");
class MobileAppParser {
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
            for (const mobileApp of mobileApps) {
                const match = user_agent_1.userAgentParser(mobileApp.regex, userAgent);
                if (!match)
                    continue;
                result.type = "mobile app";
                result.name = variable_replacement_1.variableReplacement(mobileApp.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(mobileApp.version, match), this.options.versionTruncation);
                break;
            }
            return result;
        };
        this.options = Object.assign({}, this.options, options);
    }
}
exports.default = MobileAppParser;
