"use strict";
const environment_detection_1 = require("../../utils/environment-detection");
const user_agent_1 = require("../../utils/user-agent");
const lodash_1 = require("lodash");
const LRU = require("lru-cache");
const bots = require("../../../php_modules/device-detector/regexes/bots.json");
class BotParser {
    constructor(options) {
        this.options = {
            cache: true
        };
        this.parse = (userAgent) => {
            if (this.cache) {
                const cachedResult = this.cache.get(userAgent);
                if (cachedResult) {
                    return cachedResult;
                }
            }
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
                if (this.cache) {
                    this.cache.set(userAgent, result);
                }
                return result;
            }
            if (this.cache) {
                this.cache.set(userAgent, null);
            }
            return null;
        };
        this.options = Object.assign({}, this.options, options);
        if (this.options.cache && !environment_detection_1.default()) {
            this.cache = LRU({ maxAge: this.options.cache === true ? Infinity : this.options.cache });
        }
    }
}
module.exports = BotParser;
