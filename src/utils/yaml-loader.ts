import * as path from "path";
import * as YAML from "yamljs";

export const loadYaml = (slug: string): any => {
  return YAML.load(`${path.resolve(__dirname)}/../../node_modules/device-detector/regexes/${slug}.yml`);
};
