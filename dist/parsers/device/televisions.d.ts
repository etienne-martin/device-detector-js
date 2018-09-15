import { GenericDeviceResult } from "../../typings/device";
export default class TelevisionParser {
    parse: (userAgent: string) => GenericDeviceResult;
    private isHbbTv;
}
