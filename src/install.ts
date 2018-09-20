import * as path from "path";
import * as fs from "fs";
import * as YAML from "js-yaml";

const loadYaml = (slug: string): any => {
  return YAML.load(fs.readFileSync(slug, "utf8"), {
    schema: YAML.FAILSAFE_SCHEMA
  });
};

const recursive = require("recursive-readdir");

function ignoreFilter(file: string, stats: fs.Stats) {
  if (stats.isDirectory()) return false;

  return !(stats.isFile() && path.extname(file) === ".yml");
}

// Ignore files named "foo.cs" and descendants of directories named test
recursive("./php_modules/device-detector", [ignoreFilter], (err: Error, files: string[]) => {
  for (const file of files) {
    const destination = file.replace(RegExp(".yml$", "i"), ".json");

    fs.writeFileSync(destination, JSON.stringify(loadYaml(file)));
  }
});
