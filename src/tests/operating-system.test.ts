import { OperatingSystemResult } from "../parsers/operating-system";
import { loadTests } from "../utils/yaml-loader";
import { formatVersion } from "../utils/version";
import { OperatingSystemTests } from "../typings/operating-system";
import DeviceDetector from "../index";

const operatingSystemTests: OperatingSystemTests = loadTests("Parser/fixtures/oss");
const deviceDetector = new DeviceDetector();

describe("Operating systems", () => {
  for (const operatingSystemTest of operatingSystemTests) {
    test(`${operatingSystemTest.os.name} ${operatingSystemTest.os.version || ""}`, async () => {
      const result = deviceDetector.parse(operatingSystemTest.user_agent).os as OperatingSystemResult;

      expect(result.name).toEqual(operatingSystemTest.os.name);

      if (!operatingSystemTest.os.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(operatingSystemTest.os.version));
      }
    });
  }
});
