export interface OperatingSystem {
    regex: string;
    name: string;
    version: string;
}
export declare type OperatingSystems = OperatingSystem[];
/** TEST TYPES */
export interface OperatingSystemTest {
    user_agent: string;
    os: {
        name: string;
        version: string;
        platform: string;
    };
}
export declare type OperatingSystemTests = OperatingSystemTest[];
