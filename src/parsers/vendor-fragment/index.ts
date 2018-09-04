import { VendorFragments } from "../../typings/vendor-fragment";
import { userAgentParser } from "../../utils/user-agent";
import { loadRegexes } from "../../utils/yaml-loader";

const vendorFragments: VendorFragments = loadRegexes("vendorfragments");

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
