export interface Browser {
  regex: string;
  name: string;
  version: string;
  engine?: {
    default: string,
    versions?: {
      [key: string]: string;
    }
  };
}

export interface BrowserEngine {
  regex: string;
  name: string;
}

export interface BrowserTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    short_name: string;
    version: string;
    engine?: string;
    engine_version?: string;
  };
}

export interface MobileApp {
  regex: string;
  name: string;
  version: string;
}

export interface FeedReader {
  regex: string;
  name: string;
  version: string;
  url: string;
}

export interface Library {
  regex: string;
  name: string;
  version: string;
  url?: string;
}

export interface MediaPlayer {
  regex: string;
  name: string;
  version: string;
}

export interface PersonalInformationManager {
  regex: string;
  name: string;
  version: string;
}

export type Browsers = Browser[];
export type BrowserEngines = BrowserEngine[];
export type BrowserTests = BrowserTest[];
export type MobileApps = MobileApp[];
export type FeedReaders = FeedReader[];
export type Libraries = Library[];
export type MediaPlayers = MediaPlayer[];
export type PersonalInformationManagers = PersonalInformationManager[];