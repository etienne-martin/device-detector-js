import CameraParser from "./cameras";
import MobileParser from "./mobiles";
import TelevisionParser from "./televisions";
import CarParser from "./cars";
import ConsoleParser from "./consoles";
import PortableMediaPlayerParser from "./portable-media-players";
import { GenericDeviceResult } from "../../typings/device";

export type DeviceResult = GenericDeviceResult | null;

const deviceParsers = [
  ConsoleParser,
  CarParser,
  CameraParser,
  TelevisionParser,
  PortableMediaPlayerParser,
  MobileParser
];

export default class ClientParser {
  public parse = (userAgent: string): DeviceResult => {
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
