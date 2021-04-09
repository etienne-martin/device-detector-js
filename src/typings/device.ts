export type DeviceType =
  | ""
  | "desktop"
  | "smartphone"
  | "tablet"
  | "television"
  | "smart display"
  | "camera"
  | "car"
  | "console"
  | "portable media player"

export interface GenericDeviceResult {
  type: DeviceType;
  brand: string;
  model: string;
}
