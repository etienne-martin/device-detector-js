import { trim } from "lodash";

export const formatVersion = (str: string | number | undefined): string => {
  if (str === undefined) return "";

  const trimmedString = trim(str.toString(), ".");

  if (typeof trimmedString === "string" && trimmedString.split(".").length > 2) {
    return trimmedString;
  }

  if (parseFloat(trimmedString.toString()) === parseInt(trimmedString.toString(), 10)) {
    return parseInt(trimmedString.toString(), 10).toFixed(1);
  }

  return trimmedString.toString();
};
