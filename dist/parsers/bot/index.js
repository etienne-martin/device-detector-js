"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const environment_detection_1 = __importDefault(require("../../utils/environment-detection"));
const user_agent_1 = require("../../utils/user-agent");
const get_1 = __importDefault(require("lodash/get"));
const lru_cache_1 = __importDefault(require("lru-cache"));
const jsonpack = require("jsonpack");
const bots = jsonpack.unpack(require("../../../fixtures/regexes/bots.json"));
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
                result.producer.name = get_1.default(bot, "producer.name") || "";
                result.producer.url = get_1.default(bot, "producer.url") || "";
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
            this.cache = lru_cache_1.default({ maxAge: this.options.cache === true ? Infinity : this.options.cache });
        }
    }
}
module.exports = BotParser;
