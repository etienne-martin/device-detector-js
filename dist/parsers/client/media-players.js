"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const mediaPlayers = require("../../../fixtures/regexes/client/mediaplayers.json");
class MediaPlayerParser {
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
            for (const mediaPlayer of mediaPlayers) {
                const match = user_agent_1.userAgentParser(mediaPlayer.regex, userAgent);
                if (!match)
                    continue;
                result.type = "media player";
                result.name = variable_replacement_1.variableReplacement(mediaPlayer.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(mediaPlayer.version, match), this.options.versionTruncation);
                break;
            }
            return result;
        };
        this.options = Object.assign({}, this.options, options);
    }
}
exports.default = MediaPlayerParser;
