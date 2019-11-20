export const userAgentParser = (rawRegex: string, userAgent: string): string[] | null => {
  const regex = `(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${rawRegex})`;

  // TODO: find out why it fails in some browsers
  try {
    const match = RegExp(regex, "i").exec(userAgent);

    return match ? match.slice(1) : null;
  } catch {
    return null;
  }
};
