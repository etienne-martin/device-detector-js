import * as YAML from "yamljs";
import * as path from "path";
import BrowserParser from "../parsers/browser";
import MobileAppsParser from "../parsers/mobile-apps";
import {BrowserTests, MobileApps} from "../typings/device-detector";
import { formatVersion } from "../utils/version";

const root = path.resolve(__dirname);
const browserTests: BrowserTests = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/browser.yml");
const mobileAppTests: MobileApps = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/mobile_app.yml");

describe("Client / browsers", () => {
  const browserParser = new BrowserParser();

  for (const browserTest of browserTests) {
    test(`${browserTest.client.name} ${browserTest.client.version || ""}`, async () => {
      const userAgent = browserTest.user_agent;
      const result = browserParser.detect(userAgent);

      expect(result.client.type).toEqual(browserTest.client.type);
      expect(result.client.name).toEqual(browserTest.client.name);

      if (!browserTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(browserTest.client.version));
      }

      if (!browserTest.client.engine) {
        expect(result.client.engine).toBe("");
      } else {
        expect(result.client.engine).toEqual(browserTest.client.engine);
      }
    });
  }
});

describe("Client / mobile apps", () => {
  const mobileAppsParser = new MobileAppsParser();

  for (const mobileAppTest of mobileAppTests) {
    test(`${mobileAppTest.client.name} ${mobileAppTest.client.version || ""}`, async () => {
      const userAgent = mobileAppTest.user_agent;
      const result = mobileAppsParser.detect(userAgent);

      expect(result.client.type).toEqual(mobileAppTest.client.type);
      expect(result.client.name).toEqual(mobileAppTest.client.name);

      if (!mobileAppTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(mobileAppTest.client.version));
      }
    });
  }
});
