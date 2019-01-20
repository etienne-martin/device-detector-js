export interface Camera {
    regex: string;
    device: string;
    model?: string;
    models?: Array<{
        regex: string;
        model: string;
    }>;
}
export interface Mobile {
    regex: string;
    device: string;
    model?: string;
    models?: Array<{
        regex: string;
        model: string;
        brand?: string;
        device?: string;
    }>;
}
export interface Television {
    regex: string;
    device: string;
    model?: string;
    models?: Array<{
        regex: string;
        model: string;
    }>;
}
export interface Car {
    regex: string;
    device: string;
    model?: string;
    models?: Array<{
        regex: string;
        model: string;
    }>;
}
export interface Console {
    regex: string;
    device: string;
    model?: string;
    models?: Array<{
        regex: string;
        model: string;
    }>;
}
export interface PortableMediaPlayer {
    regex: string;
    device: string;
    model?: string;
    models?: Array<{
        regex: string;
        model: string;
    }>;
}
export interface Cameras {
    [brand: string]: Camera;
}
export interface Mobiles {
    [brand: string]: Mobile;
}
export interface Televisions {
    [brand: string]: Television;
}
export interface Cars {
    [brand: string]: Car;
}
export interface Consoles {
    [brand: string]: Console;
}
export interface PortableMediaPlayers {
    [brand: string]: PortableMediaPlayer;
}
/** TEST TYPES */
export interface DeviceTest {
    user_agent: string;
    device: {
        type: string;
        brand: string;
        model: string;
    };
}
export declare type DeviceTests = DeviceTest[];
export interface GenericDeviceResult {
    type: string;
    brand: string;
    model: string;
}
