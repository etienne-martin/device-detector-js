import CameraParser from "./cameras";
import MobileParser from "./mobiles";
import TelevisionParser from "./televisions";
import CarParser from "./cars";
import ConsoleParser from "./consoles";
import PortableMediaPlayerParser from "./portable-media-players";
import { DeviceResult } from "../../typings/device";
import {userAgentParser} from "../../utils/user-agent";

type Result = DeviceResult | null;

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

      /**
       * Some user agents simply contain the fragment 'Android; Tablet;' or 'Opera Tablet', so we assume those devices as tablets
       */
      if (this.hasAndroidTabletFragment(userAgent) || userAgentParser("Opera Tablet", userAgent)) {
        device.type = "tablet";

        return device;
      }

      /**
       * Some user agents simply contain the fragment 'Android; Mobile;', so we assume those devices as smartphones
       */
      if (this.hasAndroidMobileFragment(userAgent)) {
        device.type = "smartphone";

        return device;
      }
    }

    return null;
  };

  private hasAndroidMobileFragment = (userAgent: string) => {
    return userAgentParser("Android( [\.0-9]+)?; Mobile;", userAgent);
  };

  private hasAndroidTabletFragment = (userAgent: string) => {
    return userAgentParser("Android( [\.0-9]+)?; Tablet;", userAgent);
  };
}
