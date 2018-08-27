import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";

describe("Utility functions", () => {
  test(`variable replacement`, async () => {
    expect(variableReplacement("$1", ["test"])).toEqual("test");
    expect(variableReplacement("$2 $1", ["last", "first"])).toEqual("first last");
    expect(variableReplacement("abcd ($1)", ["1.0"])).toEqual("abcd (1.0)");
  });

  test(`version formatting`, async () => {
    expect(formatVersion("0")).toEqual("0.0");
    expect(formatVersion(0)).toEqual("0.0");
    expect(formatVersion("0.1")).toEqual("0.1");
    expect(formatVersion("1.0")).toEqual("1.0");
    expect(formatVersion("1.0.")).toEqual("1.0");
    expect(formatVersion("1")).toEqual("1.0");
    expect(formatVersion("1.")).toEqual("1.0");
    expect(formatVersion("1.1.1")).toEqual("1.1.1");
    expect(formatVersion(1)).toEqual("1.0");
    expect(formatVersion("THIS IS TEXT")).toEqual("THIS IS TEXT");
    expect(formatVersion(undefined)).toEqual("");
    expect(formatVersion("534.30")).toEqual("534.30");
  });
});
