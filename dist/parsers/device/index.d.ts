import { GenericDeviceResult } from "../../typings/device";
export declare type DeviceResult = GenericDeviceResult | null;
export default class ClientParser {
    parse: (userAgent: string) => DeviceResult;
}
