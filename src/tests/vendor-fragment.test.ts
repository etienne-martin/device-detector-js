import vendorFragmentTests from "../../fixtures/Tests/Parser/fixtures/vendorfragments.json";
import VendorFragmentParser from "../parsers/vendor-fragment";
import { brands } from "./helpers";

const vendorFragmentParser = new VendorFragmentParser();

describe("Vendor fragments", () => {
  for (const vendorFragmentTest of vendorFragmentTests) {
    test(`${brands[vendorFragmentTest.vendor]}`, () => {
      const result = vendorFragmentParser.parse(vendorFragmentTest.useragent);

      expect(result).toEqual(brands[vendorFragmentTest.vendor]);
    });
  }
});
