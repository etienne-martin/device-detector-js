import DeviceDetector = require("../");
import BrowserParser from "../parsers/client/browser";

const deviceDetector = new DeviceDetector();

describe("Miscellaneous", () => {
  test(`getBrowserShortName() with unknown browser name`, async () => {
    expect(BrowserParser.getBrowserShortName("")).toEqual("");
  });

  test(`All devices running Opera TV Store are assumed to be televisions`, async () => {
    expect(deviceDetector.parse("Opera TV Store").device!.type).toEqual("television");
  });
});
