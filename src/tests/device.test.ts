import DeviceDetector from "../";
import { loadTests } from "../utils/yaml-loader";
import { DeviceTests, DeviceTest, GenericDeviceResult } from "../typings/device";
import { get } from "lodash";
import { brands } from "./helpers";

const cameraTests: DeviceTests = loadTests("Parser/Devices/fixtures/camera");
const carTests: DeviceTests = loadTests("Parser/Devices/fixtures/car_browser");
const consoleTests: DeviceTests = loadTests("Parser/Devices/fixtures/console");

const deviceDetector = new DeviceDetector();

const deviceTester = (tests: DeviceTest[]) => {
  for (const unitTest of tests) {
    test(`${brands[unitTest.device.brand]} ${unitTest.device.model || ""}`, async () => {
      const result = deviceDetector.parse(unitTest.user_agent).device as GenericDeviceResult;

      unitTest.device.type = unitTest.device.type
        .replace("8", "camera")
        .replace("6", "car")
        .replace("4", "console");

      const formattedResult = {
        type: get(result, "type") || "",
        brand: get(result, "brand") || "",
        model: get(result, "model") || "",
        userAgent: unitTest.user_agent
      };

      const formattedTest = {
        type: unitTest.device.type || "",
        brand: brands[unitTest.device.brand] || "",
        model: unitTest.device.model || "",
        userAgent: unitTest.user_agent
      };

      expect(formattedResult).toEqual(formattedTest);
    });
  }
};

describe("Device / cameras", () => {
  deviceTester(cameraTests);
});

describe("Device / cars", () => {
  deviceTester(carTests);
});

describe("Device / consoles", () => {
  deviceTester(consoleTests);
});
