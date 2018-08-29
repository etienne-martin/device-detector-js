import * as path from "path";
import * as YAML from "js-yaml";
import * as fs from "fs";

const loadYaml = (slug: string): any => {
  return YAML.load(fs.readFileSync(slug, "utf8"), {
    schema: YAML.FAILSAFE_SCHEMA
  });
};

export const loadRegexes = (slug: string): any => {
  return loadYaml(`${path.resolve(__dirname)}/../../node_modules/device-detector/regexes/${slug}.yml`);
};

export const loadTests = (slug: string): any => {
  return loadYaml(`${path.resolve(__dirname)}/../../node_modules/device-detector/Tests/${slug}.yml`);
};
