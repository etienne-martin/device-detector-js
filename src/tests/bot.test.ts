import { BotTests } from "../typings/bot";
import BotParser = require("../parsers/bot");
import { BotResult } from "../parsers/bot/typing";
import get from "lodash/get";

const botTests: BotTests = require("../../fixtures/Tests/fixtures/bots.json");
const botParser = new BotParser();

describe("Bots", () => {
  for (const botTest of botTests) {
    test(`${botTest.bot.name}`, () => {
      const result = botParser.parse(botTest.user_agent) as BotResult;

      expect(result.name).toEqual(get(botTest, "bot.name", ""));
      expect(result.category).toEqual(get(botTest, "bot.category", ""));
      expect(result.url).toEqual(get(botTest, "bot.url", ""));
      expect(result.producer.name).toEqual(get(botTest, "bot.producer.name", ""));
      expect(result.producer.url).toEqual(get(botTest, "bot.producer.url", ""));
    });
  }
});
