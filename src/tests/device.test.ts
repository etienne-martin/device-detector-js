import DeviceDetector = require("../");
import brands from "./fixtures/brands.json";

import cameraTests from "../fixtures/Tests/Parser/Device/fixtures/camera.json";
import carTests from "../fixtures/Tests/Parser/Device/fixtures/car_browser.json";
import consoleTests from "../fixtures/Tests/Parser/Device/fixtures/console.json";
import desktopTests from "../fixtures/Tests/Parser/Device/fixtures/desktop.json";
import tvTests from "../fixtures/Tests/Parser/Device/fixtures/tv.json";

const deviceDetector = new DeviceDetector();

const deviceTester = (tests: typeof cameraTests | typeof carTests | typeof consoleTests) => {
  for (const unitTest of tests) {
    const brand = unitTest.device.brand;

    test(`${brand} ${unitTest.device.model || ""}`, () => {
      const result = deviceDetector.parse(unitTest.user_agent).device;

      unitTest.device.type = unitTest.device.type
      .replace("car browser", "car")
      .replace("tv", "television");

      expect({
        type: result?.type || "",
        brand: result?.brand || "",
        model: result?.model || ""
      }).toEqual({
        type: unitTest.device.type || "",
        brand: brand || "",
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

describe("Device / desktop", () => {
  deviceTester(desktopTests);
});

describe("Device / television", () => {
  deviceTester(tvTests);
});
