"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAgentParser = (rawRegex, userAgent) => {
    try {
        const regex = `(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${rawRegex})`;
        const match = RegExp(regex, "i").exec(userAgent);
        return match ? match.slice(1) : null;
    }
    catch (error) {
        return null;
    }
};
