import { VendorFragments } from "../../typings/vendor-fragment";
import { userAgentParser } from "../../utils/user-agent";

const vendorFragments: VendorFragments = require("../../../fixtures/regexes/vendorfragments.json");

export default class VendorFragmentParser {
  public parse = (userAgent: string): string => {
    for (const [brand, vendorFragment] of Object.entries(vendorFragments)) {
      for (const regex of vendorFragment) {
        const match = userAgentParser(regex, userAgent);

        if (!match) continue;

        return brand;
      }
    }

    return "";
  };
}
