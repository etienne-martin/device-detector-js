import { Bots } from "../../typings/bot";
import { userAgentParser } from "../../utils/user-agent";
import get from "lodash/get";
import { BotResult } from "./typing";

namespace BotParser { // tslint:disable-line
  export type DeviceDetectorBotResult = BotResult | null;
}

const bots: Bots = require("../../../fixtures/regexes/bots.json");

class BotParser {
  public parse = (userAgent: string): BotParser.DeviceDetectorBotResult => {
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

      return result;
    }

    return null;
  };
}

export = BotParser;
