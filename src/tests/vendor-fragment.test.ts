import vendorFragmentTests from "../fixtures/Tests/Parser/fixtures/vendorfragments.json";
import VendorFragmentParser from "../parsers/vendor-fragment";
import brands from "./fixtures/brands.json";

const vendorFragmentParser = new VendorFragmentParser();

describe("Vendor fragments", () => {
  for (const vendorFragmentTest of vendorFragmentTests) {
    const brand = (brands as Record<string, string>)[vendorFragmentTest.vendor];

    test(`${brand}`, () => {
      const result = vendorFragmentParser.parse(vendorFragmentTest.useragent);

      expect(result).toEqual(brand);
    });
  }
});
