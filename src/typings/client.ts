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
export type MobileApps = MobileApp[];
export type FeedReaders = FeedReader[];
export type Libraries = Library[];
export type MediaPlayers = MediaPlayer[];
export type PersonalInformationManagers = PersonalInformationManager[];

/** TEST TYPES */

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

export interface FeedReaderTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    version: string;
  };
}

export interface MobileAppTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    version: string;
  };
}

export interface LibraryTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    version: string;
  };
}

export interface MediaPlayerTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    version: string;
  };
}

export interface PersonalInformationManagerTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    version: string;
  };
}

export type BrowserTests = BrowserTest[];
export type FeedReaderTests = FeedReaderTest[];
export type MobileAppTests = MobileAppTest[];
export type LibraryTests = LibraryTest[];
export type MediaPlayerTests = MediaPlayerTest[];
export type PersonalInformationManagerTests = PersonalInformationManagerTest[];