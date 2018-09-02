import ClientParser, { ClientResult } from "./parsers/client";
import DeviceParser, { DeviceResult } from "./parsers/device";

interface Result {
  client: ClientResult;
  device: DeviceResult;
}

const clientParser = new ClientParser();
const deviceParser = new DeviceParser();

export default class DeviceDetector {
  public parse = (userAgent: string): Result => {
    return {
      client: clientParser.parse(userAgent),
      device: deviceParser.parse(userAgent)
    };
  };
}
