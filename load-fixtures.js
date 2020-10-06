const path = require("path");
const fs = require("fs");
const YAML = require("js-yaml");
const glob = require("glob");

const loadYaml = (filepath) => {
  return YAML.load(fs.readFileSync(filepath, "utf8"), {
    schema: YAML.FAILSAFE_SCHEMA
  });
};

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) return;

  ensureDirectoryExistence(dirname);

  fs.mkdirSync(dirname);
};

glob("**/*.yml", {
  cwd: "./node_modules/device-detector/"
}, (err, files) => {
  for (const file of files) {
    const src = path.join("./node_modules/device-detector", file);
    const dest = path.join("./src/fixtures", file.replace(RegExp(".yml$", "i"), ".json"));

    ensureDirectoryExistence(dest);

    const fixture = loadYaml(src);
    const json = JSON.stringify(fixture);

    fs.writeFileSync(dest, json);
  }
});
