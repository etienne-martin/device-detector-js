import { Bots } from "../../typings/bot";
import isBrowser from "../../utils/environment-detection";
import { userAgentParser } from "../../utils/user-agent";
import get from "lodash/get";
import { BotResult } from "./typing";
import LRU from "lru-cache";

namespace BotParser { // tslint:disable-line
  export type DeviceDetectorBotResult = BotResult | null;

  export interface Options {
    cache: boolean | number;
  }
}

const bots: Bots = require("../../../fixtures/regexes/bots.json");

class BotParser {
  private readonly cache: LRU.Cache<string, BotParser.DeviceDetectorBotResult> | undefined;
  private readonly options: BotParser.Options = {
    cache: true
  };

  constructor(options?: Partial<BotParser.Options>) {
    this.options = {...this.options, ...options};

    if (this.options.cache && !isBrowser()) {
      this.cache = LRU<string, BotParser.DeviceDetectorBotResult>({ maxAge: this.options.cache === true ? Infinity : this.options.cache });
    }
  }

  public parse = (userAgent: string): BotParser.DeviceDetectorBotResult => {
    if (this.cache) {
      const cachedResult = this.cache.get(userAgent);

      if (cachedResult) {
        return cachedResult;
      }
    }

    const result: BotResult = {
      name: "",
      category: "",
      url: "",
      producer: {
        name: "",
        url: ""
      }
    };

    for (const bot of bots) {
      const match = userAgentParser(bot.regex, userAgent);

      if (!match) continue;

      result.name = bot.name;
      result.category = bot.category || "";
      result.url = bot.url || "";
      result.producer.name = get(bot, "producer.name") || "";
      result.producer.url = get(bot, "producer.url") || "";

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
}

export = BotParser;
