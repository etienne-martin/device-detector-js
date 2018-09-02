const DeviceDetector = require("./dist/").default;
const deviceDetector = new DeviceDetector();

deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36")

console.time("Detection");
console.log(deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"));
console.timeEnd("Detection");

console.time("Detection2");
console.log(deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0"));
console.timeEnd("Detection2");

console.time("Detection3");
console.log(deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15"));
console.timeEnd("Detection3");