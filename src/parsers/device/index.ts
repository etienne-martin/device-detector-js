import CameraParser, { CameraResult } from "./cameras";
import MobileParser, { MobileResult } from "./mobiles";

type Result = CameraResult | MobileResult | null;

const deviceParsers = [
  CameraParser,
  MobileParser
];

export default class ClientParser {
  public parse = (userAgent: string): Result => {
    for (const Parser of deviceParsers) {
      const parser = new Parser();
      const device = parser.parse(userAgent);

      if (device.type !== "") {
        return device;
      }
    }

    return null;
  };
}
