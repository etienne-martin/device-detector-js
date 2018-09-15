"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const yaml_loader_1 = require("../../utils/yaml-loader");
const browsers = yaml_loader_1.loadRegexes("client/browsers");
const browserEngines = yaml_loader_1.loadRegexes("client/browser_engine");
const availableBrowsers = { "36": "360 Phone Browser", "3B": "360 Browser", "AA": "Avant Browser", "AB": "ABrowse", "AF": "ANT Fresco", "AG": "ANTGalio", "AL": "Aloha Browser", "AM": "Amaya", "AO": "Amigo", "AN": "Android Browser", "AR": "Arora", "AV": "Amiga Voyager", "AW": "Amiga Aweb", "AT": "Atomic Web Browser", "AS": "Avast Secure Browser", "BB": "BlackBerry Browser", "BD": "Baidu Browser", "BS": "Baidu Spark", "BE": "Beonex", "BJ": "Bunjalloo", "BL": "B-Line", "BR": "Brave", "BK": "BriskBard", "BX": "BrowseX", "CA": "Camino", "CC": "Coc Coc", "CD": "Comodo Dragon", "C1": "Coast", "CX": "Charon", "CF": "Chrome Frame", "HC": "Headless Chrome", "CH": "Chrome", "CI": "Chrome Mobile iOS", "CK": "Conkeror", "CM": "Chrome Mobile", "CN": "CoolNovo", "CO": "CometBird", "CP": "ChromePlus", "CR": "Chromium", "CY": "Cyberfox", "CS": "Cheshire", "CU": "Cunaguaro", "DB": "dbrowser", "DE": "Deepnet Explorer", "DF": "Dolphin", "DO": "Dorado", "DL": "Dooble", "DI": "Dillo", "EI": "Epic", "EL": "Elinks", "EB": "Element Browser", "EP": "GNOME Web", "ES": "Espial TV Browser", "FB": "Firebird", "FD": "Fluid", "FE": "Fennec", "FF": "Firefox", "FK": "Firefox Focus", "FL": "Flock", "FM": "Firefox Mobile", "FW": "Fireweb", "FN": "Fireweb Navigator", "GA": "Galeon", "GE": "Google Earth", "HJ": "HotJava", "IA": "Iceape", "IB": "IBrowse", "IC": "iCab", "I2": "iCab Mobile", "I1": "Iridium", "ID": "IceDragon", "IV": "Isivioo", "IW": "Iceweasel", "IE": "Internet Explorer", "IM": "IE Mobile", "IR": "Iron", "JS": "Jasmine", "JI": "Jig Browser", "KI": "Kindle Browser", "KM": "K-meleon", "KO": "Konqueror", "KP": "Kapiko", "KY": "Kylo", "KZ": "Kazehakase", "LB": "Liebao", "LG": "LG Browser", "LI": "Links", "LU": "LuaKit", "LS": "Lunascape", "LX": "Lynx", "MB": "MicroB", "MC": "NCSA Mosaic", "ME": "Mercury", "MF": "Mobile Safari", "MI": "Midori", "MU": "MIUI Browser", "MS": "Mobile Silk", "MX": "Maxthon", "NB": "Nokia Browser", "NO": "Nokia OSS Browser", "NV": "Nokia Ovi Browser", "NE": "NetSurf", "NF": "NetFront", "NL": "NetFront Life", "NP": "NetPositive", "NS": "Netscape", "NT": "NTENT Browser", "OB": "Obigo", "OD": "Odyssey Web Browser", "OF": "Off By One", "OE": "ONE Browser", "OI": "Opera Mini", "OM": "Opera Mobile", "OP": "Opera", "ON": "Opera Next", "OR": "Oregano", "OV": "Openwave Mobile Browser", "OW": "OmniWeb", "OT": "Otter Browser", "PL": "Palm Blazer", "PM": "Pale Moon", "PP": "Oppo Browser", "PR": "Palm Pre", "PU": "Puffin", "PW": "Palm WebPro", "PA": "Palmscape", "PX": "Phoenix", "PO": "Polaris", "PT": "Polarity", "PS": "Microsoft Edge", "QQ": "QQ Browser", "QT": "Qutebrowser", "QZ": "QupZilla", "RK": "Rekonq", "RM": "RockMelt", "SB": "Samsung Browser", "SA": "Sailfish Browser", "SC": "SEMC-Browser", "SE": "Sogou Explorer", "SF": "Safari", "SH": "Shiira", "SK": "Skyfire", "SS": "Seraphic Sraf", "SL": "Sleipnir", "SM": "SeaMonkey", "SN": "Snowshoe", "SR": "Sunrise", "SP": "SuperBird", "ST": "Streamy", "SX": "Swiftfox", "TZ": "Tizen Browser", "TS": "TweakStyle", "UC": "UC Browser", "VI": "Vivaldi", "VB": "Vision Mobile Browser", "WE": "WebPositive", "WF": "Waterfox", "WO": "wOSBrowser", "WT": "WeTab Browser", "YA": "Yandex Browser", "XI": "Xiino" };
const mobileOnlyBrowsers = ["36", "PU", "SK", "MF", "OI", "OM", "DB", "ST", "BL", "IV", "FM", "C1", "AL", "SA"];
class BrowserParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                type: "",
                name: "",
                version: "",
                engine: "",
                engineVersion: ""
            };
            for (const browser of browsers) {
                const match = user_agent_1.userAgentParser(browser.regex, userAgent);
                if (!match)
                    continue;
                const vrpVersion = variable_replacement_1.variableReplacement(browser.version, match);
                const version = version_1.formatVersion(vrpVersion, this.options.versionTruncation);
                const shortVersion = version && parseFloat(version_1.formatVersion(vrpVersion, 1)) || "";
                if (browser.engine) {
                    result.engine = browser.engine.default;
                    if (browser.engine && browser.engine.versions && shortVersion) {
                        const sortedEngineVersions = Object.entries(browser.engine.versions).sort((a, b) => {
                            return parseFloat(a[0]) > parseFloat(b[0]) ? 1 : -1;
                        });
                        for (const [versionThreshold, engineByVersion] of sortedEngineVersions) {
                            if (parseFloat(versionThreshold) <= shortVersion) {
                                result.engine = engineByVersion;
                            }
                        }
                    }
                }
                result.type = "browser";
                result.name = variable_replacement_1.variableReplacement(browser.name, match);
                result.version = version;
                break;
            }
            if (!result.engine) {
                for (const browserEngine of browserEngines) {
                    const match = RegExp(browserEngine.regex, "i").exec(userAgent);
                    if (!match)
                        continue;
                    result.engine = browserEngine.name;
                    break;
                }
            }
            result.engineVersion = version_1.formatVersion(version_1.parseBrowserEngineVersion(userAgent, result.engine), this.options.versionTruncation);
            return result;
        };
        this.options = Object.assign({}, this.options, options);
    }
}
BrowserParser.getBrowserShortName = (browserName) => {
    for (const [shortName, name] of Object.entries(availableBrowsers)) {
        if (name === browserName) {
            return shortName;
        }
    }
    return "";
};
BrowserParser.isMobileOnlyBrowser = (browserName) => {
    return mobileOnlyBrowsers.includes(BrowserParser.getBrowserShortName(browserName));
};
exports.default = BrowserParser;
