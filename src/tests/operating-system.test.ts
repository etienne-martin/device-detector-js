import DeviceDetector = require("../");
import operatingSystemTests from "../fixtures/Tests/Parser/fixtures/oss.json";
import { OperatingSystemResult } from "../parsers/operating-system";
import { formatVersion } from "../utils/version";

const deviceDetector = new DeviceDetector({
  versionTruncation: 1
});

describe("Operating systems", () => {
  for (const operatingSystemTest of operatingSystemTests) {
    test(`${operatingSystemTest.os.name} ${operatingSystemTest.os.version || ""}`, () => {
      const result = deviceDetector.parse(operatingSystemTest.user_agent).os as OperatingSystemResult;

      expect(result.name).toEqual(operatingSystemTest.os.name);

      if (!operatingSystemTest.os.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(operatingSystemTest.os.version, 1));
      }

      expect(result.platform).toBe(operatingSystemTest.os.platform || "");
    });
  }
});
