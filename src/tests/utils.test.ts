import { formatVersion } from "../utils/version";
import { variableReplacement } from "../utils/variable-replacement";
import { userAgentParser } from "../utils/user-agent";

describe("Utility functions", () => {
  test(`variable replacement`, () => {
    expect(variableReplacement("$1", ["test"])).toEqual("test");
    expect(variableReplacement("$2 $1", ["last", "first"])).toEqual("first last");
    expect(variableReplacement("abcd ($1)", ["1.0"])).toEqual("abcd (1.0)");
  });

  test(`version formatting`, () => {
    expect(formatVersion("0", null)).toEqual("0.0");
    expect(formatVersion("0.1", null)).toEqual("0.1");
    expect(formatVersion("1.0", null)).toEqual("1.0");
    expect(formatVersion("1.0.", null)).toEqual("1.0");
    expect(formatVersion("1", null)).toEqual("1.0");
    expect(formatVersion("1.", null)).toEqual("1.0");
    expect(formatVersion("1.1.1", null)).toEqual("1.1.1");
    expect(formatVersion("THIS IS TEXT", null)).toEqual("THIS IS TEXT");
    expect(formatVersion(undefined, null)).toEqual("");
    expect(formatVersion("534.30", null)).toEqual("534.30");

    // Test version truncation
    expect(formatVersion("1", 0)).toEqual("1");
    expect(formatVersion("1", 1)).toEqual("1.0");
    expect(formatVersion("1", 2)).toEqual("1.0");
    expect(formatVersion("1.1.3", 1)).toEqual("1.1");
    expect(formatVersion("1.1.3", 2)).toEqual("1.1.3");
    expect(formatVersion("1.1.3.5", 3)).toEqual("1.1.3.5");

    expect(formatVersion("14.12.2125.9740.01 ", 1)).toEqual("14.12");
    expect(formatVersion(" 14.12.2125.9740.01", 1)).toEqual("14.12");
    expect(formatVersion(" 14.12.2125.9740.01 ", 1)).toEqual("14.12");

    expect(formatVersion("5.00.00", 1)).toEqual("5.0");
    expect(formatVersion("8.00", 1)).toEqual("8.0");

    // This shouldn't get truncated
    expect(formatVersion("THIS.IS.SOME.TEXT", 1)).toEqual("THIS.IS.SOME.TEXT");
  });

  test(`userAgentParser shouldn't throw when handling a non-supported regex`, () => {
    expect(userAgentParser("?<!?<!", "USER-AGENT")).toEqual(null);
  });
});
