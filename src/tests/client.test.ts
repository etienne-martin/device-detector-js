import DeviceDetector from "../";
import { loadTests } from "../utils/yaml-loader";
import { formatVersion } from "../utils/version";
import { BrowserResult } from "../parsers/client/browser";
import { MobileAppResult } from "../parsers/client/mobile-apps";
import { FeedReaderResult } from "../parsers/client/feed-readers";
import { LibraryResult } from "../parsers/client/libraries";
import { MediaPlayerResult } from "../parsers/client/media-players";
import { PersonalInformationManagerResult } from "../parsers/client/personal-information-managers";

import {
  BrowserTests,
  FeedReaderTests,
  MobileAppTests,
  LibraryTests,
  MediaPlayerTests,
  PersonalInformationManagerTests
} from "../typings/client";

const browserTests: BrowserTests = loadTests("Parser/Client/fixtures/browser");
const feedReaderTests: FeedReaderTests = loadTests("Parser/Client/fixtures/feed_reader");
const libraryTests: LibraryTests = loadTests("Parser/Client/fixtures/library");
const mediaPlayerTests: MediaPlayerTests = loadTests("Parser/Client/fixtures/mediaplayer");
const mobileAppTests: MobileAppTests = loadTests("Parser/Client/fixtures/mobile_app");
const personalInformationManagerTests: PersonalInformationManagerTests = loadTests("Parser/Client/fixtures/pim");

const deviceDetector = new DeviceDetector();

describe("Client / browsers", () => {
  for (const browserTest of browserTests) {
    test(`${browserTest.client.name} ${browserTest.client.version || ""}`, async () => {
      const result = deviceDetector.parse(browserTest.user_agent).client as BrowserResult;

      expect(result.type).toEqual(browserTest.client.type);
      expect(result.name).toEqual(browserTest.client.name);

      if (!browserTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(browserTest.client.version));
      }

      if (!browserTest.client.engine) {
        expect(result.engine).toBe("");
      } else {
        expect(result.engine).toEqual(browserTest.client.engine);
      }

      if (!browserTest.client.engine_version) {
        expect(result.engineVersion).toBe("");
      } else {
        expect(result.engineVersion).toEqual(formatVersion(browserTest.client.engine_version));
      }
    });
  }
});

describe("Client / mobile apps", () => {
  for (const mobileAppTest of mobileAppTests) {
    test(`${mobileAppTest.client.name} ${mobileAppTest.client.version || ""}`, async () => {
      const result = deviceDetector.parse(mobileAppTest.user_agent).client as MobileAppResult;

      expect(result.type).toEqual(mobileAppTest.client.type);
      expect(result.name).toEqual(mobileAppTest.client.name);

      if (!mobileAppTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(mobileAppTest.client.version));
      }
    });
  }
});

describe("Client / feed readers", () => {
  for (const feedReaderTest of feedReaderTests) {
    test(`${feedReaderTest.client.name} ${feedReaderTest.client.version || ""}`, async () => {
      const result = deviceDetector.parse(feedReaderTest.user_agent).client as FeedReaderResult;

      expect(result.type).toEqual(feedReaderTest.client.type);
      expect(result.name).toEqual(feedReaderTest.client.name);

      if (!feedReaderTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(feedReaderTest.client.version));
      }
    });
  }
});

describe("Client / libraries", () => {
  for (const libraryTest of libraryTests) {
    test(`${libraryTest.client.name} ${libraryTest.client.version || ""}`, async () => {
      const result = deviceDetector.parse(libraryTest.user_agent).client as LibraryResult;

      expect(result.type).toEqual(libraryTest.client.type);
      expect(result.name).toEqual(libraryTest.client.name);

      if (!libraryTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(libraryTest.client.version));
      }
    });
  }
});

describe("Client / media players", () => {
  for (const mediaPlayerTest of mediaPlayerTests) {
    test(`${mediaPlayerTest.client.name} ${mediaPlayerTest.client.version || ""}`, async () => {
      const result = deviceDetector.parse(mediaPlayerTest.user_agent).client as MediaPlayerResult;
      const sanitizedType = mediaPlayerTest.client.type.replace("mediaplayer", "media player");

      expect(result.type).toEqual(sanitizedType);
      expect(result.name).toEqual(mediaPlayerTest.client.name);

      if (!mediaPlayerTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(mediaPlayerTest.client.version));
      }
    });
  }
});

describe("Client / personal information managers", () => {
  for (const personalInformationManagerTest of personalInformationManagerTests) {
    test(`${personalInformationManagerTest.client.name} ${personalInformationManagerTest.client.version || ""}`, async () => {
      const result = deviceDetector.parse(personalInformationManagerTest.user_agent).client as PersonalInformationManagerResult;
      const sanitizedType = personalInformationManagerTest.client.type.replace("pim", "personal information manager");

      expect(result.type).toEqual(sanitizedType);
      expect(result.name).toEqual(personalInformationManagerTest.client.name);

      if (!personalInformationManagerTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(personalInformationManagerTest.client.version));
      }
    });
  }
});
