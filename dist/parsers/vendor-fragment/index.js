"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_agent_1 = require("../../utils/user-agent");
const vendorFragments = require("../../../fixtures/regexes/vendorfragments.json");
class VendorFragmentParser {
    constructor() {
        this.parse = (userAgent) => {
            for (const [brand, vendorFragment] of Object.entries(vendorFragments)) {
                for (const regex of vendorFragment) {
                    const match = user_agent_1.userAgentParser(regex, userAgent);
                    if (!match)
                        continue;
                    return brand;
                }
            }
            return "";
        };
    }
}
exports.default = VendorFragmentParser;
