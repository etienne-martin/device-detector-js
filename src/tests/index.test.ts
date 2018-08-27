import * as YAML from "yamljs";
import * as path from "path";
import BrowserParser from "../parsers/browser";
import MobileAppParser from "../parsers/mobile-apps";
import FeedReaderParser from "../parsers/feed-readers";
import LibraryParser from "../parsers/libraries";
import MediaPlayerParser from "../parsers/media-players";
import PersonalInformationManagerParser from "../parsers/personal-information-managers";
import {BrowserTests, FeedReaders, MobileApps, Libraries, MediaPlayers, PersonalInformationManagers} from "../typings/device-detector";
import { formatVersion } from "../utils/version";

const root = path.resolve(__dirname);
const browserTests: BrowserTests = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/browser.yml");
const mobileAppTests: MobileApps = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/mobile_app.yml");
const feedReaderTests: FeedReaders = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/feed_reader.yml");
const libraryTests: Libraries = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/library.yml");
const mediaPlayerTests: MediaPlayers = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/mediaplayer.yml");
const personalInformationManagerTests: PersonalInformationManagers = YAML.load(root + "/../../node_modules/device-detector-tests/Tests/Parser/Client/fixtures/pim.yml");

describe("Client / browsers", () => {
  for (const browserTest of browserTests) {
    test(`${browserTest.client.name} ${browserTest.client.version || ""}`, async () => {
      const result = new BrowserParser().detect(browserTest.user_agent);

      expect(result.client.type).toEqual(browserTest.client.type);
      expect(result.client.name).toEqual(browserTest.client.name);

      if (!browserTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(browserTest.client.version));
      }

      if (!browserTest.client.engine) {
        expect(result.client.engine).toBe("");
      } else {
        expect(result.client.engine).toEqual(browserTest.client.engine);
      }
    });
  }
});

describe("Client / mobile apps", () => {
  for (const mobileAppTest of mobileAppTests) {
    test(`${mobileAppTest.client.name} ${mobileAppTest.client.version || ""}`, async () => {
      const result = new MobileAppParser().detect(mobileAppTest.user_agent);

      expect(result.client.type).toEqual(mobileAppTest.client.type);
      expect(result.client.name).toEqual(mobileAppTest.client.name);

      if (!mobileAppTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(mobileAppTest.client.version));
      }
    });
  }
});

describe("Client / feed readers", () => {
  for (const feedReaderTest of feedReaderTests) {
    test(`${feedReaderTest.client.name} ${feedReaderTest.client.version || ""}`, async () => {
      const result = new FeedReaderParser().detect(feedReaderTest.user_agent);

      expect(result.client.type).toEqual(feedReaderTest.client.type);
      expect(result.client.name).toEqual(feedReaderTest.client.name);

      if (!feedReaderTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(feedReaderTest.client.version));
      }
    });
  }
});

describe("Client / libraries", () => {
  for (const libraryTest of libraryTests) {
    test(`${libraryTest.client.name} ${libraryTest.client.version || ""}`, async () => {
      const result = new LibraryParser().detect(libraryTest.user_agent);

      expect(result.client.type).toEqual(libraryTest.client.type);
      expect(result.client.name).toEqual(libraryTest.client.name);

      if (!libraryTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(libraryTest.client.version));
      }
    });
  }
});

describe("Client / media players", () => {
  for (const mediaPlayerTest of mediaPlayerTests) {
    test(`${mediaPlayerTest.client.name} ${mediaPlayerTest.client.version || ""}`, async () => {
      const result = new MediaPlayerParser().detect(mediaPlayerTest.user_agent);

      expect(result.client.type).toEqual("media player");
      expect(result.client.name).toEqual(mediaPlayerTest.client.name);

      if (!mediaPlayerTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(mediaPlayerTest.client.version));
      }
    });
  }
});

describe("Client / personal information managers", () => {
  for (const personalInformationManagerTest of personalInformationManagerTests) {
    test(`${personalInformationManagerTest.client.name} ${personalInformationManagerTest.client.version || ""}`, async () => {
      const result = new PersonalInformationManagerParser().detect(personalInformationManagerTest.user_agent);

      expect(result.client.type).toEqual("media player");
      expect(result.client.name).toEqual(personalInformationManagerTest.client.name);

      if (!personalInformationManagerTest.client.version) {
        expect(result.client.version).toBe("");
      } else {
        expect(result.client.version).toEqual(formatVersion(personalInformationManagerTest.client.version));
      }
    });
  }
});
