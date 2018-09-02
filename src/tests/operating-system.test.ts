import OperatingSystemParser from "../parsers/operating-system";
import { loadTests } from "../utils/yaml-loader";
import { formatVersion } from "../utils/version";
import { LibraryResult } from "../parsers/client/libraries";
import { LibraryTests } from "../typings/client";

const libraryTests: LibraryTests = loadTests("Parser/Client/fixtures/library");
const operatingSystemParser = new OperatingSystemParser();

// describe("Client / libraries", () => {
//   for (const libraryTest of libraryTests) {
//     test(`${libraryTest.client.name} ${libraryTest.client.version || ""}`, async () => {
//       const result = operatingSystemParser.parse(libraryTest.user_agent) as LibraryResult;
//
//       expect(result.type).toEqual(libraryTest.client.type);
//       expect(result.name).toEqual(libraryTest.client.name);
//
//       if (!libraryTest.client.version) {
//         expect(result.version).toBe("");
//       } else {
//         expect(result.version).toEqual(formatVersion(libraryTest.client.version));
//       }
//     });
//   }
// });
