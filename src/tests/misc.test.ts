import DeviceDetector = require("../");
import BrowserParser from "../parsers/client/browser";

const deviceDetector = new DeviceDetector();

describe("Miscellaneous", () => {
  test(`getBrowserShortName() with unknown browser name`, () => {
    expect(BrowserParser.getBrowserShortName("")).toEqual("");
  });

  test(`All devices running Opera TV Store are assumed to be televisions`, () => {
    expect(deviceDetector.parse("Opera TV Store").device!.type).toEqual("television");
  });
});
