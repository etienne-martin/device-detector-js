# device-detector-js

The Universal Device Detection library will parse any User Agent and detect the browser, operating system, device used (desktop, tablet, mobile, tv, cars, console, etc.), brand and model.

This is a Node.js port of Matomo [device-detector](https://github.com/etienne-martin/matomo-device-detector).

## Getting Started

### Installation

To use device-detector-js in your project, run:

```bash
npm install device-detector-js
```

### Usage

**Example** - simple user agent detection:

```javascript
const DeviceDetector = require("device-detector-js");

const deviceDetector = new DeviceDetector();
const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36";
const device = deviceDetector.parse(userAgent);

console.log(device);
```

Output:

```json
{
  "client": {
    "type": "browser",
    "name": "Chrome",
    "version": "69.0",
    "engine": "Blink",
    "engineVersion": ""
  },
  "os": {
    "name": "Mac",
    "version": "10.13",
    "platform": ""
  },
  "device": {
    "type": "desktop",
    "brand": "Apple",
    "model": ""
  },
  "bot": null
}
```

## Built with

* [Matomo device detector](https://github.com/etienne-martin/matomo-device-detector) - A powerful device detection library.
* [node.js](https://nodejs.org/en/) - Cross-platform JavaScript run-time environment for executing JavaScript code server-side. 
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
* [Jest](https://facebook.github.io/jest/) - Delightful JavaScript Testing.

## Contributing

When contributing to this project, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Update the [README.md](https://github.com/etienne-martin/device-detector/blob/master/README.md) with details of changes to the library.

Execute `npm run test` and update the [tests](https://github.com/etienne-martin/device-detector/tree/master/src/tests) if needed.

## Authors

* **Etienne Martin** - *Initial work* - [etiennemartin.ca](http://etiennemartin.ca/)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/etienne-martin/device-detector/blob/master/LICENSE) file for details.
