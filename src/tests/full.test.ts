import DeviceDetector = require("../");
import { formatVersion } from "../utils/version";
import brands from "./fixtures/brands.json";
import { BrowserResult } from "../parsers/client/browser";

const tests: any = [
  ...require("../fixtures/Tests/fixtures/camera.json"),
  ...require("../fixtures/Tests/fixtures/car_browser.json"),
  ...require("../fixtures/Tests/fixtures/console.json"),
  ...require("../fixtures/Tests/fixtures/desktop.json"),
  ...require("../fixtures/Tests/fixtures/feature_phone.json"),
  ...require("../fixtures/Tests/fixtures/feed_reader.json"),
  ...require("../fixtures/Tests/fixtures/mediaplayer.json"),
  ...require("../fixtures/Tests/fixtures/mobile_apps.json"),
  ...require("../fixtures/Tests/fixtures/phablet.json"),
  ...require("../fixtures/Tests/fixtures/portable_media_player.json"),
  ...require("../fixtures/Tests/fixtures/smart_display.json"),
  ...require("../fixtures/Tests/fixtures/smart_speaker.json"),
  ...require("../fixtures/Tests/fixtures/smartphone.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-1.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-2.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-3.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-4.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-5.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-6.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-7.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-8.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-9.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-10.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-11.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-12.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-13.json"),
  ...require("../fixtures/Tests/fixtures/smartphone-14.json"),
  ...require("../fixtures/Tests/fixtures/tablet.json"),
  ...require("../fixtures/Tests/fixtures/tablet-1.json"),
  ...require("../fixtures/Tests/fixtures/tablet-2.json"),
  ...require("../fixtures/Tests/fixtures/tablet-3.json"),
  ...require("../fixtures/Tests/fixtures/tv.json"),
  ...require("../fixtures/Tests/fixtures/unknown.json")
];

const versionTruncation = 1;

const deviceDetector = new DeviceDetector({
  versionTruncation
});

describe("Full test", () => {
  for (const unitTest of tests) {
    const brand = (brands as Record<string, string>)[unitTest.device.brand] || "";

    test(`${unitTest.os.name || ""} ${brand} ${unitTest.client.name || ""}`, () => {
      const result = deviceDetector.parse(unitTest.user_agent);

      const expectedClientType = (unitTest.client.type || "")
        .replace("pim", "personal information manager")
        .replace("mediaplayer", "media player");

      const expectedDeviceType = (unitTest.device.type || "")
        .replace("car browser", "car")
        .replace("tv", "television");

      // Some tests contains "null" as string for the model
      // We need to sanitize it
      if (unitTest.device.model === "null") {
        unitTest.device.model = "";
      }

      expect({
        os: {
          name: result?.os?.name || "",
          version: result?.os?.version || "",
          platform: result?.os?.platform || ""
        },
        client: {
          type: result?.client?.type || "",
          name: result?.client?.name || "",
          version: result?.client?.version || "",
          engine: result?.client?.type === "browser" ? (result?.client as BrowserResult).engine : "",
          engineVersion: result?.client?.type === "browser" ? (result?.client as BrowserResult).engineVersion : "",
        },
        device: {
          type: result?.device?.type || "",
          brand: result?.device?.brand || "",
          model: result?.device?.model || ""
        }
      }).toEqual({
        os: {
          name: unitTest.os.name || "",
          version: formatVersion(unitTest.os.version, versionTruncation) || "",
          platform: unitTest.os.platform || ""
        },
        client: {
          type: expectedClientType,
          name: unitTest.client.name || "",
          version: formatVersion(unitTest.client.version, versionTruncation) || "",
          engine: unitTest.client.engine || "",
          engineVersion: formatVersion(unitTest.client.engine_version, versionTruncation) || "",
        },
        device: {
          type: expectedDeviceType,
          brand,
          model: unitTest.device.model || ""
        }
      });
    });
  }
});
