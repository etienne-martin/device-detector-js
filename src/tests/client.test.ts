import DeviceDetector = require("../");
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

const browserTests: BrowserTests = require("../../fixtures/Tests/Parser/Client/fixtures/browser.json");
const feedReaderTests: FeedReaderTests = require("../../fixtures/Tests/Parser/Client/fixtures/feed_reader.json");
const libraryTests: LibraryTests = require("../../fixtures/Tests/Parser/Client/fixtures/library.json");
const mediaPlayerTests: MediaPlayerTests = require("../../fixtures/Tests/Parser/Client/fixtures/mediaplayer.json");
const mobileAppTests: MobileAppTests = require("../../fixtures/Tests/Parser/Client/fixtures/mobile_app.json");
const personalInformationManagerTests: PersonalInformationManagerTests = require("../../fixtures/Tests/Parser/Client/fixtures/pim.json");

const versionTruncation = 1;

const deviceDetector = new DeviceDetector({
  versionTruncation
});

describe("Client / browsers", () => {
  for (const browserTest of browserTests) {
    test(`${browserTest.client.name} ${browserTest.client.version || ""}`, () => {
      const result = deviceDetector.parse(browserTest.user_agent).client as BrowserResult;

      expect({
        client: result
      }).toEqual({
        client: {
          type: browserTest.client.type || "",
          name: browserTest.client.name || "",
          version: formatVersion(browserTest.client.version, versionTruncation) || "",
          engine: browserTest.client.engine || "",
          engineVersion: formatVersion(browserTest.client.engine_version, versionTruncation) || "",
        }
      });
    });
  }
});

describe("Client / mobile apps", () => {
  for (const mobileAppTest of mobileAppTests) {
    test(`${mobileAppTest.client.name} ${mobileAppTest.client.version || ""}`, () => {
      const result = deviceDetector.parse(mobileAppTest.user_agent).client as MobileAppResult;

      expect({
        client: result
      }).toEqual({
        client: {
          type: mobileAppTest.client.type || "",
          name: mobileAppTest.client.name || "",
          version: formatVersion(mobileAppTest.client.version, versionTruncation) || "",
        }
      });
    });
  }
});

describe("Client / feed readers", () => {
  for (const feedReaderTest of feedReaderTests) {
    test(`${feedReaderTest.client.name} ${feedReaderTest.client.version || ""}`, () => {
      const result = deviceDetector.parse(feedReaderTest.user_agent).client as FeedReaderResult;

      expect(result.type).toEqual(feedReaderTest.client.type);
      expect(result.name).toEqual(feedReaderTest.client.name);

      if (!feedReaderTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(feedReaderTest.client.version, versionTruncation));
      }
    });
  }
});

describe("Client / libraries", () => {
  for (const libraryTest of libraryTests) {
    test(`${libraryTest.client.name} ${libraryTest.client.version || ""}`, () => {
      const result = deviceDetector.parse(libraryTest.user_agent).client as LibraryResult;

      expect(result.type).toEqual(libraryTest.client.type);
      expect(result.name).toEqual(libraryTest.client.name);

      if (!libraryTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(libraryTest.client.version, versionTruncation));
      }
    });
  }
});

describe("Client / media players", () => {
  for (const mediaPlayerTest of mediaPlayerTests) {
    test(`${mediaPlayerTest.client.name} ${mediaPlayerTest.client.version || ""}`, () => {
      const result = deviceDetector.parse(mediaPlayerTest.user_agent).client as MediaPlayerResult;
      const sanitizedType = mediaPlayerTest.client.type.replace("mediaplayer", "media player");

      expect(result.type).toEqual(sanitizedType);
      expect(result.name).toEqual(mediaPlayerTest.client.name);

      if (!mediaPlayerTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(mediaPlayerTest.client.version, versionTruncation));
      }
    });
  }
});

describe("Client / personal information managers", () => {
  for (const personalInformationManagerTest of personalInformationManagerTests) {
    test(`${personalInformationManagerTest.client.name} ${personalInformationManagerTest.client.version || ""}`, () => {
      const result = deviceDetector.parse(personalInformationManagerTest.user_agent).client as PersonalInformationManagerResult;
      const sanitizedType = personalInformationManagerTest.client.type.replace("pim", "personal information manager");

      expect(result.type).toEqual(sanitizedType);
      expect(result.name).toEqual(personalInformationManagerTest.client.name);

      if (!personalInformationManagerTest.client.version) {
        expect(result.version).toBe("");
      } else {
        expect(result.version).toEqual(formatVersion(personalInformationManagerTest.client.version, versionTruncation));
      }
    });
  }
});
