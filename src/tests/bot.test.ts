import botTests from "../fixtures/Tests/fixtures/bots.json";
import BotParser = require("../parsers/bot");
import { BotResult } from "../parsers/bot/typing";

const botParser = new BotParser();

describe("Bots", () => {
  for (const botTest of botTests) {
    test(`${botTest.bot.name}`, () => {
      const result = botParser.parse(botTest.user_agent) as BotResult;

      expect(result.name).toEqual(botTest?.bot.name || "");
      expect(result.category).toEqual(botTest?.bot.category || "");
      expect(result.url).toEqual(botTest?.bot.url || "");
      expect(result.producer.name).toEqual(botTest?.bot.producer?.name || "");
      expect(result.producer.url).toEqual(botTest?.bot.producer?.url || "");
    });
  }
});
