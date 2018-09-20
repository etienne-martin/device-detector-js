"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trim_1 = __importDefault(require("lodash/trim"));
// TODO: implement $maxMinorParts
exports.formatVersion = (version, versionTruncation) => {
    if (version === undefined)
        return "";
    const versionString = trim_1.default(version, ".").replace(new RegExp("_", "g"), ".");
    const versionParts = versionString.split(".");
    // Return if the string is not only digits once we removed the dots
    if (!/^\d+$/.test(versionParts.join(""))) {
        return versionString;
    }
    if (versionTruncation !== 0) {
        if (Number.isInteger(parseFloat(versionString))) {
            return parseInt(versionString, 10).toFixed(1);
        }
    }
    if (versionParts.length > 1) {
        if (versionTruncation !== null) {
            return versionParts.slice(0, versionTruncation + 1).join(".");
        }
    }
    return versionString;
};
exports.parseBrowserEngineVersion = (userAgent, engine) => {
    if (!engine) {
        return "";
    }
    const regex = new RegExp(`${engine}\\s*\\/?\\s*((?:(?=\\d+\\.\\d)\\d+[.\\d]*|\\d{1,7}(?=(?:\\D|$))))`, "i");
    const match = userAgent.match(regex);
    if (!match) {
        return "";
    }
    return match.pop();
};
