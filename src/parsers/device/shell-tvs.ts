import shellTvs from "../../fixtures/regexes/device/shell_tv.json"
import { GenericDeviceResult } from "../../typings/device";
import { variableReplacement } from "../../utils/variable-replacement";
import { userAgentParser } from "../../utils/user-agent";
import { buildModel } from "../../utils/model";

export default class ShellTvParser {
  public parse = (userAgent: string): GenericDeviceResult => {
    const result: GenericDeviceResult = {
      type: "",
      brand: "",
      model: ""
    };

    if (!this.isShellTv(userAgent)) return result;

    result.type = "television";

    for (const [brand, shellTv] of Object.entries(shellTvs)) {
      const match = userAgentParser(shellTv.regex, userAgent);

      if (!match) continue;

      result.brand = brand;
      result.model = buildModel(variableReplacement(shellTv.model, match)).trim();

      break;
    }

    return result;
  };

  private isShellTv = (userAgent: string) => {
    return userAgentParser("[a-z]+[ _]Shell[ _]\\w{6}", userAgent);
  };
}
