import { trim } from "lodash";

// TODO: implement $maxMinorParts
export const formatVersion = (version: string | number | undefined): string => {
  if (version === undefined) return "";

  let versionString = trim(version.toString(), ".");

  versionString = versionString.replace("_", ".");

  if (versionString.split(".").length > 2) {
    return versionString;
  }

  if (Number.isInteger(parseFloat(versionString.toString()))) {
    return parseInt(versionString.toString(), 10).toFixed(1);
  }

  return versionString;
};

export const parseBrowserEngineVersion = (userAgent: string, engine: string) => {
  if (!engine) {
    return "";
  }

  const regex = new RegExp(`${engine}\\s*\\/?\\s*((?:(?=\\d+\\.\\d)\\d+[.\\d]*|\\d{1,7}(?=(?:\\D|$))))`, "i");
  const match = userAgent.match(regex);

  if (!match) {
    return "";
  }

  return match.pop();
};
