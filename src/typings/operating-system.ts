export interface OperatingSystem {
  regex: string;
  name: string;
  version: string;
}

export type OperatingSystems = OperatingSystem[];