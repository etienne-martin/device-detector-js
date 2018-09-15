const DeviceDetector = require("./dist/");
const deviceDetector = new DeviceDetector();

setTimeout(() => {
  deviceDetector.parse("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");

  console.time("Detection");
  console.log(JSON.stringify(deviceDetector.parse("Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)"), null, 2));
  console.timeEnd("Detection");
}, 1000);