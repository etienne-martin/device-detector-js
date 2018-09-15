import { GenericDeviceResult } from "../../typings/device";
export default class CarParser {
    parse: (userAgent: string) => GenericDeviceResult;
}
