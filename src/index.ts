import ClientParser, { ClientResult } from "./parsers/client";
import DeviceParser, { DeviceResult } from "./parsers/device";
import OperatingSystemParser, { Result as OperatingSystemResult } from "./parsers/operating-system";
import BrowserParser from "./parsers/client/browser";
import { get } from "lodash";
import { userAgentParser } from "./utils/user-agent";
import { versionCompare } from "./utils/version-compare";

interface Result {
  client: ClientResult;
  device: DeviceResult;
  os: OperatingSystemResult;
}

const clientParser = new ClientParser();
const deviceParser = new DeviceParser();
const operatingSystemParser = new OperatingSystemParser();

const createDeviceObject = () => ({
  type: "",
  brand: "",
  model: ""
});

export default class DeviceDetector {
  public parse = (userAgent: string): Result => {
    const result = {
      client: clientParser.parse(userAgent),
      device: deviceParser.parse(userAgent),
      os: operatingSystemParser.parse(userAgent)
    };

    const osName = get(result, "os.name");
    const osVersion = get(result, "os.version");
    const osFamily = OperatingSystemParser.getOsFamily(OperatingSystemParser.getOsShortName(get(result, "os.name")));

    /**
     * Assume all devices running iOS / Mac OS are from Apple
     */
    if (!get(result, "device.brand") && ["Apple TV", "iOS", "Mac"].includes(osName)) {
      if (!result.device) {
        result.device = createDeviceObject();
      }

      result.device.brand = "Apple";
    }

    /**
     * Chrome on Android passes the device type based on the keyword 'Mobile'
     * If it is present the device should be a smartphone, otherwise it's a tablet
     * See https://developer.chrome.com/multidevice/user-agent#chrome_for_android_user_agent
     */
    // if (is_null($this->device) && $osFamily == 'Android' && in_array($this->getClient('name'), array('Chrome', 'Chrome Mobile'))) {
    //   if ($this->matchUserAgent('Chrome/[\.0-9]* Mobile')) {
    //     $this->device = DeviceParserAbstract::DEVICE_TYPE_SMARTPHONE;
    //   } else if ($this->matchUserAgent('Chrome/[\.0-9]* (?!Mobile)')) {
    //     $this->device = DeviceParserAbstract::DEVICE_TYPE_TABLET;
    //   }
    // }

    /**
     * Android up to 3.0 was designed for smartphones only. But as 3.0, which was tablet only, was published
     * too late, there were a bunch of tablets running with 2.x
     * With 4.0 the two trees were merged and it is for smartphones and tablets
     *
     * So were are expecting that all devices running Android < 2 are smartphones
     * Devices running Android 3.X are tablets. Device type of Android 2.X and 4.X+ are unknown
     */
    if (!get(result, "device.type") && osName === "Android" && osVersion !== "") {
      if (versionCompare(osVersion, "2.0") === -1) {
        if (!result.device) {
          result.device = createDeviceObject();
        }

        result.device.type = "smartphone";
      } else if (versionCompare(osVersion, "3.0") >= 0 && versionCompare(osVersion, "4.0") === -1) {
        if (!result.device) {
          result.device = createDeviceObject();
        }

        result.device.type = "tablet";
      }
    }

    /**
     * All detected feature phones running android are more likely smartphones
     */
    if (get(result, "device.type") === "feature phone" && osFamily === "Android") {
      if (!result.device) {
        result.device = createDeviceObject();
      }

      result.device.type = "smartphone";
    }

    /**
     * According to http://msdn.microsoft.com/en-us/library/ie/hh920767(v=vs.85).aspx
     * Internet Explorer 10 introduces the "Touch" UA string token. If this token is present at the end of the
     * UA string, the computer has touch capability, and is running Windows 8 (or later).
     * This UA string will be transmitted on a touch-enabled system running Windows 8 (RT)
     *
     * As most touch enabled devices are tablets and only a smaller part are desktops/notebooks we assume that
     * all Windows 8 touch devices are tablets.
     */
    if (
      !get(result, "device.type")
      && this.isToucheEnabled(userAgent)
      && (
        osName === "Windows RT"
        || (
          osName === "Windows"
          && versionCompare(osVersion, "8.0") >= 0
        )
      )
    ) {
      if (!result.device) {
        result.device = createDeviceObject();
      }

      result.device.type = "tablet";
    }

    /**
     * Devices running Kylo or Espital TV Browsers are assumed to be televisions
     */
    if (!get(result, "device.type") && ["Kylo", "Espial TV Browser"].includes(get(result, "client.name"))) {
      if (!result.device) {
        result.device = createDeviceObject();
      }

      result.device.type = "television";
    }

    // set device type to desktop for all devices running a desktop os that were not detected as an other device type
    if (!get(result, "device.type") && result.os && this.isDesktop(result, osFamily)) {
      if (!result.device) {
        result.device = createDeviceObject();
      }

      result.device.type = "desktop";
    }

    return result;
  };

  private isDesktop = (result: Result, osFamily: string): boolean => {
    if (!result.os) {
      return false;
    }

    const osShortName = OperatingSystemParser.getOsShortName(result.os.name);

    if (!osShortName) {
      return false;
    }

    // Check for browsers available for mobile devices only
    if (this.usesMobileBrowser(result.client)) {
      return false;
    }

    return OperatingSystemParser.getDesktopOsArray().includes(osFamily);
  };

  private usesMobileBrowser = (client: Result["client"]) => {
    if (!client) return false;

    return get(client, "type") === "browser" && BrowserParser.isMobileOnlyBrowser(get(client, "name"));
  };

  private isToucheEnabled = (userAgent: string) => {
    return userAgentParser("Touch", userAgent);
  };
}
