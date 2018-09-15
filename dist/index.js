"use strict";
const client_1 = require("./parsers/client");
const device_1 = require("./parsers/device");
const operating_system_1 = require("./parsers/operating-system");
const vendor_fragment_1 = require("./parsers/vendor-fragment");
const browser_1 = require("./parsers/client/browser");
const bot_1 = require("./parsers/bot");
const lodash_1 = require("lodash");
const user_agent_1 = require("./utils/user-agent");
const version_compare_1 = require("./utils/version-compare");
const LRU = require("lru-cache");
class DeviceDetector {
    constructor(options) {
        // Default options
        this.options = {
            skipBotDetection: false,
            versionTruncation: 1,
            cache: true
        };
        this.parse = (userAgent) => {
            if (this.cache) {
                const cachedResult = this.cache.get(userAgent);
                if (cachedResult) {
                    return cachedResult;
                }
            }
            const result = {
                client: this.clientParser.parse(userAgent),
                os: this.operatingSystemParser.parse(userAgent),
                device: this.deviceParser.parse(userAgent),
                bot: this.options.skipBotDetection ? null : this.botParser.parse(userAgent)
            };
            if (!lodash_1.get(result, "device.brand")) {
                const brand = this.vendorFragmentParser.parse(userAgent);
                if (brand) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.brand = brand;
                }
            }
            const osName = lodash_1.get(result, "os.name");
            const osVersion = lodash_1.get(result, "os.version");
            const osFamily = operating_system_1.default.getOsFamily(lodash_1.get(result, "os.name"));
            /**
             * Assume all devices running iOS / Mac OS are from Apple
             */
            if (!lodash_1.get(result, "device.brand") && ["Apple TV", "iOS", "Mac"].includes(osName)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.brand = "Apple";
            }
            /**
             * Chrome on Android passes the device type based on the keyword 'Mobile'
             * If it is present the device should be a smartphone, otherwise it's a tablet
             * See https://developer.chrome.com/multidevice/user-agent#chrome_for_android_user_agent
             */
            if (!lodash_1.get(result, "device.type") && osFamily === "Android" && ["Chrome", "Chrome Mobile"].includes(lodash_1.get(result, "client.name"))) {
                if (user_agent_1.userAgentParser("Chrome/[.0-9]* Mobile", userAgent)) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "smartphone";
                }
                else if (user_agent_1.userAgentParser("Chrome/[.0-9]* (?!Mobile)", userAgent)) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "tablet";
                }
            }
            /**
             * Some user agents simply contain the fragment 'Android; Tablet;' or 'Opera Tablet', so we assume those devices are tablets
             */
            if (!lodash_1.get(result, "device.type") && this.hasAndroidTabletFragment(userAgent) || user_agent_1.userAgentParser("Opera Tablet", userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "tablet";
            }
            /**
             * Some user agents simply contain the fragment 'Android; Mobile;', so we assume those devices are smartphones
             */
            if (!lodash_1.get(result, "device.type") && this.hasAndroidMobileFragment(userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "smartphone";
            }
            /**
             * Android up to 3.0 was designed for smartphones only. But as 3.0, which was tablet only, was published
             * too late, there were a bunch of tablets running with 2.x
             * With 4.0 the two trees were merged and it is for smartphones and tablets
             *
             * So were are expecting that all devices running Android < 2 are smartphones
             * Devices running Android 3.X are tablets. Device type of Android 2.X and 4.X+ are unknown
             */
            if (!lodash_1.get(result, "device.type") && osName === "Android" && osVersion !== "") {
                if (version_compare_1.versionCompare(osVersion, "2.0") === -1) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "smartphone";
                }
                else if (version_compare_1.versionCompare(osVersion, "3.0") >= 0 && version_compare_1.versionCompare(osVersion, "4.0") === -1) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "tablet";
                }
            }
            /**
             * All detected feature phones running android are more likely smartphones
             */
            if (result.device && lodash_1.get(result, "device.type") === "feature phone" && osFamily === "Android") {
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
            if (!lodash_1.get(result, "device.type")
                && this.isToucheEnabled(userAgent)
                && (osName === "Windows RT"
                    || (osName === "Windows"
                        && version_compare_1.versionCompare(osVersion, "8.0") >= 0))) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "tablet";
            }
            /**
             * All devices running Opera TV Store are assumed to be televisions
             */
            if (user_agent_1.userAgentParser("Opera TV Store", userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "television";
            }
            /**
             * Devices running Kylo or Espital TV Browsers are assumed to be televisions
             */
            if (!lodash_1.get(result, "device.type") && ["Kylo", "Espial TV Browser"].includes(lodash_1.get(result, "client.name"))) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "television";
            }
            // set device type to desktop for all devices running a desktop os that were not detected as an other device type
            if (!lodash_1.get(result, "device.type") && this.isDesktop(result, osFamily)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "desktop";
            }
            if (this.cache) {
                this.cache.set(userAgent, result);
            }
            return result;
        };
        this.hasAndroidMobileFragment = (userAgent) => {
            return user_agent_1.userAgentParser("Android( [\.0-9]+)?; Mobile;", userAgent);
        };
        this.hasAndroidTabletFragment = (userAgent) => {
            return user_agent_1.userAgentParser("Android( [\.0-9]+)?; Tablet;", userAgent);
        };
        this.isDesktop = (result, osFamily) => {
            if (!result.os) {
                return false;
            }
            // Check for browsers available for mobile devices only
            if (this.usesMobileBrowser(result.client)) {
                return false;
            }
            return operating_system_1.default.getDesktopOsArray().includes(osFamily);
        };
        this.usesMobileBrowser = (client) => {
            if (!client)
                return false;
            return lodash_1.get(client, "type") === "browser" && browser_1.default.isMobileOnlyBrowser(lodash_1.get(client, "name"));
        };
        this.isToucheEnabled = (userAgent) => {
            return user_agent_1.userAgentParser("Touch", userAgent);
        };
        this.createDeviceObject = () => ({
            type: "",
            brand: "",
            model: ""
        });
        this.options = Object.assign({}, this.options, options);
        this.clientParser = new client_1.default(this.options);
        this.deviceParser = new device_1.default();
        this.operatingSystemParser = new operating_system_1.default(this.options);
        this.vendorFragmentParser = new vendor_fragment_1.default();
        this.botParser = new bot_1.default();
        if (this.options.cache) {
            this.cache = LRU({ maxAge: this.options.cache === true ? Infinity : this.options.cache });
        }
    }
}
module.exports = DeviceDetector;
