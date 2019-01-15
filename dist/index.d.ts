import { ClientResult } from "./parsers/client";
import { DeviceResult } from "./parsers/device";
import { Result as OperatingSystemResult } from "./parsers/operating-system";
import BotParser = require("./parsers/bot");
declare namespace DeviceDetector {
    interface DeviceDetectorResult {
        client: ClientResult;
        device: DeviceResult;
        os: OperatingSystemResult;
        bot: BotParser.Result;
    }
    interface Options {
        skipBotDetection: boolean;
        versionTruncation: 0 | 1 | 2 | 3 | null;
        cache: boolean | number;
    }
}
declare class DeviceDetector {
    private readonly cache;
    private clientParser;
    private deviceParser;
    private operatingSystemParser;
    private vendorFragmentParser;
    private botParser;
    private readonly options;
    constructor(options?: Partial<DeviceDetector.Options>);
    parse: (userAgent: string) => DeviceDetector.DeviceDetectorResult;
    private hasAndroidMobileFragment;
    private hasAndroidTabletFragment;
    private isDesktop;
    private usesMobileBrowser;
    private isToucheEnabled;
    private createDeviceObject;
}
export = DeviceDetector;
