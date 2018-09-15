const DeviceDetector = require("./dist/");
const deviceDetector = new DeviceDetector();

setTimeout(() => {
  deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");

  console.time("Detection");
  console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"), null, 2));
  console.timeEnd("Detection");
}, 1000);