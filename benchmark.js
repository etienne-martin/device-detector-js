const DeviceDetector = require("./dist/").default;
const deviceDetector = new DeviceDetector();

setTimeout(() => {
    deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");

    console.time("Detection");
    console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (Linux; Android 5.1.1; General Mobile 4G Build/LUZ59K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Mobile Safari/537.36"), null, 2));
    console.timeEnd("Detection");
}, 1000);