export const trim = (str: string, char: string) => {
  if (!str) return "";

  return str.replace(new RegExp(
    "^[" + char + "]+|[" + char + "]+$", "g"
  ), "");
};
