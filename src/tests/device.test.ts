import DeviceDetector = require("../");
import { DeviceTests, DeviceTest, GenericDeviceResult } from "../typings/device";
import { brands } from "./helpers";

const cameraTests: DeviceTests = require("../../fixtures/Tests/Parser/Devices/fixtures/camera.json");
const carTests: DeviceTests = require("../../fixtures/Tests/Parser/Devices/fixtures/car_browser.json");
const consoleTests: DeviceTests = require("../../fixtures/Tests/Parser/Devices/fixtures/console.json");

const deviceDetector = new DeviceDetector();

const deviceTester = (tests: DeviceTest[]) => {
  for (const unitTest of tests) {
    test(`${brands[unitTest.device.brand]} ${unitTest.device.model || ""}`, () => {
      const result = deviceDetector.parse(unitTest.user_agent).device as GenericDeviceResult;

      unitTest.device.type = unitTest.device.type
        .replace("8", "camera")
        .replace("6", "car")
        .replace("4", "console");

      expect({
        type: result?.type || "",
        brand: result?.brand || "",
        model: result?.model || ""
      }).toEqual({
        type: unitTest.device.type || "",
        brand: brands[unitTest.device.brand] || "",
        model: unitTest.device.model || ""
      });
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
