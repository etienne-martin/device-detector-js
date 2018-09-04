import { loadTests } from "../utils/yaml-loader";
import { BotTests } from "../typings/bot";
import BotParser, { BotResult } from "../parsers/bot";
import { get } from "lodash";

const botTests: BotTests = loadTests("fixtures/bots");
const botParser = new BotParser();

describe("Vendor fragments", () => {
  for (const botTest of botTests) {
    test(`${botTest.bot.name}`, async () => {
      const result = botParser.parse(botTest.user_agent) as BotResult;

      expect(result.name).toEqual(botTest.bot.name);
      expect(result.category).toEqual(botTest.bot.category);
      expect(result.url).toEqual(botTest.bot.url);
      expect(result.producer.name).toEqual(get(botTest, "bot.producer.name"));
      expect(result.producer.url).toEqual(get(botTest, "bot.producer.url"));
    });
  }
});
