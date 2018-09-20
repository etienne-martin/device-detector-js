import { GenericDeviceResult } from "../../typings/device";
export default class MobileParser {
    parse: (userAgent: string) => GenericDeviceResult;
}
