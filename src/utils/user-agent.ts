export const userAgentParser = (rawRegex: string, userAgent: string): RegExpExecArray | null => {
  const regex = `(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${rawRegex})`;

  return RegExp(regex, "i").exec(userAgent);
};
