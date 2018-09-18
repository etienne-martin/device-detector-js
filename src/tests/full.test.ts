import DeviceDetector = require("../");
import { loadTests } from "../utils/yaml-loader";
import { get } from "lodash";
import { formatVersion } from "../utils/version";
import { brands } from "./helpers";

const tests: any = [
  ...loadTests("fixtures/camera"),
  ...loadTests("fixtures/car_browser"),
  ...loadTests("fixtures/console"),
  ...loadTests("fixtures/desktop"),
  ...loadTests("fixtures/feature_phone"),
  ...loadTests("fixtures/feed_reader"),
  ...loadTests("fixtures/mediaplayer"),
  ...loadTests("fixtures/mobile_apps"),
  ...loadTests("fixtures/phablet"),
  ...loadTests("fixtures/portable_media_player"),
  ...loadTests("fixtures/smart_display"),
  ...loadTests("fixtures/smartphone"),
  ...loadTests("fixtures/smartphone-1"),
  ...loadTests("fixtures/smartphone-2"),
  ...loadTests("fixtures/smartphone-3"),
  ...loadTests("fixtures/smartphone-4"),
  ...loadTests("fixtures/smartphone-5"),
  ...loadTests("fixtures/smartphone-6"),
  ...loadTests("fixtures/tablet"),
  ...loadTests("fixtures/tablet-1"),
  ...loadTests("fixtures/tablet-2"),
  ...loadTests("fixtures/tv"),
  ...loadTests("fixtures/unknown")
];

const versionTruncation = 1;

const deviceDetector = new DeviceDetector({
  versionTruncation
});

describe("Full test", () => {
  for (const unitTest of tests) {
    test(`${unitTest.os.name || ""} ${brands[unitTest.device.brand] || ""} ${unitTest.client.name || ""}`, () => {
      const result = deviceDetector.parse(unitTest.user_agent);

      const formattedResult = {
        os: {
          name: get(result, "os.name") || "",
          version: get(result, "os.version") || "",
          platform: get(result, "os.platform") || ""
        },
        client: {
          type: get(result, "client.type") || "",
          name: get(result, "client.name") || "",
          version: get(result, "client.version") || "",
          engine: get(result, "client.engine") || "",
          engineVersion: get(result, "client.engineVersion") || ""
        },
        device: {
          type: get(result, "device.type") || "",
          brand: get(result, "device.brand") || "",
          model: get(result, "device.model") || ""
        },
        userAgent: unitTest.user_agent
      };

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

      const formattedTest = {
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
          brand: brands[unitTest.device.brand] || "",
          model: unitTest.device.model || ""
        },
        userAgent: unitTest.user_agent
      };

      expect(formattedResult).toEqual(formattedTest);
    });
  }
});
