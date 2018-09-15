"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_agent_1 = require("../../utils/user-agent");
const yaml_loader_1 = require("../../utils/yaml-loader");
const lodash_1 = require("lodash");
const bots = yaml_loader_1.loadRegexes("bots");
class BotParser {
    constructor() {
        this.parse = (userAgent) => {
            const result = {
                name: "",
                category: "",
                url: "",
                producer: {
                    name: "",
                    url: ""
                }
            };
            for (const bot of bots) {
                const match = user_agent_1.userAgentParser(bot.regex, userAgent);
                if (!match)
                    continue;
                result.name = bot.name;
                result.category = bot.category || "";
                result.url = bot.url || "";
                result.producer.name = lodash_1.get(bot, "producer.name") || "";
                result.producer.url = lodash_1.get(bot, "producer.url") || "";
                return result;
            }
            return null;
        };
    }
}
exports.default = BotParser;
