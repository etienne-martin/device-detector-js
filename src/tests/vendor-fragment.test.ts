import { loadTests } from "../utils/yaml-loader";
import { VendorFragmentTests } from "../typings/vendor-fragment";
import VendorFragmentParser from "../parsers/vendor-fragment";
import { brands } from "./helpers";

const vendorFragmentTests: VendorFragmentTests = loadTests("Parser/fixtures/vendorfragments");
const vendorFragmentParser = new VendorFragmentParser();

describe("Vendor fragments", () => {
  for (const vendorFragmentTest of vendorFragmentTests) {
    test(`${brands[vendorFragmentTest.vendor]}`, async () => {
      const result = vendorFragmentParser.parse(vendorFragmentTest.useragent);

      expect(result).toEqual(brands[vendorFragmentTest.vendor]);
    });
  }
});
