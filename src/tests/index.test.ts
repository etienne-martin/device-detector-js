import * as YAML from "yamljs";
import * as path from "path";
import DeviceDetector from "../index";
import { BrowserTests } from "../typings/device-detector";
import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";

const root = path.resolve(__dirname);
const browserTests: BrowserTests = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/browser.yml");
const deviceDetector = new DeviceDetector();

describe("Utility functions", () => {
  test(`variable replacement`, async () => {
    expect(variableReplacement("$1", ["test"])).toEqual("test");
    expect(variableReplacement("$2 $1", ["last", "first"])).toEqual("first last");
    expect(variableReplacement("abcd ($1)", ["1.0"])).toEqual("abcd (1.0)");
  });

  test(`version formatting`, async () => {
    expect(formatVersion("0")).toEqual("0.0");
    expect(formatVersion(0)).toEqual("0.0");
    expect(formatVersion("0.1")).toEqual("0.1");
    expect(formatVersion("1.0")).toEqual("1.0");
    expect(formatVersion("1.0.")).toEqual("1.0");
    expect(formatVersion("1")).toEqual("1.0");
    expect(formatVersion("1.")).toEqual("1.0");
    expect(formatVersion("1.1.1")).toEqual("1.1.1");
    expect(formatVersion(1)).toEqual("1.0");
    expect(formatVersion("THIS IS TEXT")).toEqual("THIS IS TEXT");
    expect(formatVersion(undefined)).toEqual("");
  });
});

describe("Client / browsers", () => {
  for (const browserTest of browserTests) {
    test(`${browserTest.client.name} ${browserTest.client.version || ""}`, async () => {
      const userAgent = browserTest.user_agent;
      const result = deviceDetector.detect(userAgent);

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
