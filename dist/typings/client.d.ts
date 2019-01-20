export interface Browser {
    regex: string;
    name: string;
    version: string;
    engine?: {
        default: string;
        versions?: {
            [key: string]: string;
        };
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
export declare type Browsers = Browser[];
export declare type BrowserEngines = BrowserEngine[];
export declare type MobileApps = MobileApp[];
export declare type FeedReaders = FeedReader[];
export declare type Libraries = Library[];
export declare type MediaPlayers = MediaPlayer[];
export declare type PersonalInformationManagers = PersonalInformationManager[];
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
export declare type BrowserTests = BrowserTest[];
export declare type FeedReaderTests = FeedReaderTest[];
export declare type MobileAppTests = MobileAppTest[];
export declare type LibraryTests = LibraryTest[];
export declare type MediaPlayerTests = MediaPlayerTest[];
export declare type PersonalInformationManagerTests = PersonalInformationManagerTest[];
