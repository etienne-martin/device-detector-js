import { DeviceDetectorResult, DeviceDetectorOptions } from "../../dist";
import DeviceDetector = require("../../dist");
import BotDetector = require("../..//dist/parsers/bot");

export interface ExportedTypeTest {
  deviceDetectorResult: DeviceDetectorResult;
  deviceDetectorOptions: DeviceDetectorOptions;
}

describe("compiled library", () => {
  test("compiled device detector", () => {
    const deviceDetector = new DeviceDetector();
    const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36";

    expect(() => deviceDetector.parse(userAgent)).not.toThrow();
  });

  test("compiled bot detector", () => {
    const botDetector = new BotDetector();
    const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)";

    expect(() => botDetector.parse(userAgent)).not.toThrow();
  });
});
