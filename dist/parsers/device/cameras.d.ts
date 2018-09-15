import { GenericDeviceResult } from "../../typings/device";
export default class CameraParser {
    parse: (userAgent: string) => GenericDeviceResult;
}
