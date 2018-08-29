export interface Camera {
  regex: string;
  device: string;
  model?: string;
  models?: Array<{
    regex: string;
    model: string;
  }>
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
  }>
}

export interface Television {
  regex: string;
  device: string;
  model?: string;
  models?: Array<{
    regex: string;
    model: string;
  }>
}

export interface Car {
  regex: string;
  device: string;
  model?: string;
  models?: Array<{
    regex: string;
    model: string;
  }>
}

export interface Console {
  regex: string;
  device: string;
  model?: string;
  models?: Array<{
    regex: string;
    model: string;
  }>
}

export interface PortableMediaPlayer {
  regex: string;
  device: string;
  model?: string;
  models?: Array<{
    regex: string;
    model: string;
  }>
}

export interface Cameras { [brand: string]: Camera; }
export interface Mobiles { [brand: string]: Mobile; }
export interface Televisions { [brand: string]: Television; }
export interface Cars { [brand: string]: Car; }
export interface Consoles { [brand: string]: Console; }
export interface PortableMediaPlayers { [brand: string]: PortableMediaPlayer; }

export interface CameraTest {
  user_agent: string;
  device: {
    type: string;
    brand: string;
    model: string;
  };
}

export interface MobileTest {
  user_agent: string;
  device: {
    type: string;
    brand: string;
    model: string;
  };
}

export interface TelevisionTest {
  user_agent: string;
  device: {
    type: string;
    brand: string;
    model: string;
  };
}

export interface CarTest {
  user_agent: string;
  device: {
    type: string;
    brand: string;
    model: string;
  };
}

export interface ConsoleTest {
  user_agent: string;
  device: {
    type: string;
    brand: string;
    model: string;
  };
}

export interface PortableMediaPlayerTest {
  user_agent: string;
  device: {
    type: string;
    brand: string;
    model: string;
  };
}

export type CameraTests = CameraTest[];
export type MobileTests = MobileTest[];
export type TelevisionTests = TelevisionTest[];
export type CarTests = CarTest[];
export type ConsoleTests = ConsoleTest[];
export type PortableMediaPlayerTests = PortableMediaPlayerTest[];