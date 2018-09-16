import { loadTests } from "../utils/yaml-loader";
import { BotTests } from "../typings/bot";
import BotParser = require("../parsers/bot");
import { BotResult } from "../parsers/bot/typing";
import { get } from "lodash";

const botTests: BotTests = loadTests("fixtures/bots");
const botParser = new BotParser();

describe("Bots", () => {
  for (const botTest of botTests) {
    test(`${botTest.bot.name}`, () => {
      const result = botParser.parse(botTest.user_agent) as BotResult;

      expect(result.name).toEqual(botTest.bot.name);

      if (!get(botTest, "bot.category")) {
        expect(result.category).toEqual("");
      } else {
        expect(result.category).toEqual(botTest.bot.category);
      }

      if (!get(botTest, "bot.url")) {
        expect(result.url).toEqual("");
      } else {
        expect(result.url).toEqual(botTest.bot.url);
      }

      if (!get(botTest, "bot.producer.name")) {
        expect(result.producer.name).toEqual("");
      } else {
        expect(result.producer.name).toEqual(get(botTest, "bot.producer.name"));
      }

      if (!get(botTest, "bot.producer.url")) {
        expect(result.producer.url).toEqual("");
      } else {
        expect(result.producer.url).toEqual(get(botTest, "bot.producer.url"));
      }
    });
  }
});
