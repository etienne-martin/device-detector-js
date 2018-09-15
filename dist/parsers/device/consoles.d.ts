import { GenericDeviceResult } from "../../typings/device";
export default class ConsoleParser {
    parse: (userAgent: string) => GenericDeviceResult;
}
