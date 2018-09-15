import { GenericDeviceResult } from "../../typings/device";
export default class PortableMediaPlayersParser {
    parse: (userAgent: string) => GenericDeviceResult;
}
