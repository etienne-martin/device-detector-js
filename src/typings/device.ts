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
  }>
}

export interface Cameras { [key: string]: Camera; }
export interface Mobiles { [key: string]: Mobile; }

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

export type CameraTests = CameraTest[];
export type MobileTests = MobileTest[];