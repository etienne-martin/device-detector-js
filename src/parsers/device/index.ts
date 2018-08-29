import CameraParser, { CameraResult } from "./cameras";
import MobileParser, { MobileResult } from "./mobiles";
import TelevisionParser, { TelevisionResult } from "./televisions";
import CarParser, { CarResult } from "./cars";
import ConsoleParser, { ConsoleResult } from "./consoles";
import PortableMediaPlayerParser, { PortableMediaPlayerResult } from "./portable-media-players";

type Result = CameraResult | MobileResult | TelevisionResult | CarResult | ConsoleResult | PortableMediaPlayerResult | null;

const deviceParsers = [
  ConsoleParser,
  CarParser,
  CameraParser,
  TelevisionParser,
  PortableMediaPlayerParser,
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
