const DeviceDetector = require("./dist/").default;
const deviceDetector = new DeviceDetector({
  skipBotDetection: false,
  cache: 0.5
});

setTimeout(() => {
  deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");

  console.time("Detection");
  console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (Windows; N; Windows NT 5.2; ru-RU) AppleWebKit/529 (KHTML, like Gecko, Safari/529.0) Lunascape/4.9.9.94"), null, 2));
  console.timeEnd("Detection");

  console.time("Detection");
  console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (Windows; N; Windows NT 5.2; ru-RU) AppleWebKit/529 (KHTML, like Gecko, Safari/529.0) Lunascape/4.9.9.94"), null, 2));
  console.timeEnd("Detection");

  console.time("Detection");
  console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (Windows; N; Windows NT 5.2; ru-RU) AppleWebKit/529 (KHTML, like Gecko, Safari/529.0) Lunascape/4.9.9.94"), null, 2));
  console.timeEnd("Detection");

  setTimeout(() => {
    console.time("Detection");
    console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (Windows; N; Windows NT 5.2; ru-RU) AppleWebKit/529 (KHTML, like Gecko, Safari/529.0) Lunascape/4.9.9.94"), null, 2));
    console.timeEnd("Detection");
  }, 1000);
}, 1000);