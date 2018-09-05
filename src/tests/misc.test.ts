import BrowserParser from "../parsers/client/browser";

describe("Miscellaneous", () => {
  test(`getBrowserShortName() with unknown browser name`, async () => {
    expect(BrowserParser.getBrowserShortName("")).toEqual("");
  });
});
