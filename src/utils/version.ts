import { trim } from "lodash";

// TODO: implement $maxMinorParts
export const formatVersion = (str: string | number | undefined): string => {
  if (str === undefined) return "";

  let sanitizedString = trim(str.toString(), ".");
  sanitizedString = sanitizedString.replace("_", ".");

  if (typeof sanitizedString === "string" && sanitizedString.split(".").length > 2) {
    return sanitizedString;
  }

  if (parseFloat(sanitizedString.toString()) === parseInt(sanitizedString.toString(), 10)) {
    return parseInt(sanitizedString.toString(), 10).toFixed(1);
  }

  return sanitizedString.toString();
};
