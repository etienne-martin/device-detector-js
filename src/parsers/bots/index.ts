import { Bots } from "../../typings/bots";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

export interface BotResult {
  name: string;
  category: string;
  url: string;
  producer: {
    name: string;
    url: string;
  }
}

export type Result = BotResult | null;

const bots: Bots = loadRegexes("bots");

export default class BotParser {
  public parse = (userAgent: string): Result => {
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
      result.category = bot.category;
      result.url = bot.url;
      result.producer.name = bot.producer.name;
      result.producer.url = bot.producer.url;

      return result;
    }

    return null;
  };
}
