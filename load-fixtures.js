const path = require("path");
const fs = require("fs");
const YAML = require("js-yaml");
const recursive = require("recursive-readdir");

const loadYaml = (filepath) => {
  return YAML.load(fs.readFileSync(filepath, "utf8"), {
    schema: YAML.FAILSAFE_SCHEMA
  });
};

const ignoreFilter = (file, stats) => {
  if (stats.isDirectory()) return false;

  return !(stats.isFile() && path.extname(file) === ".yml");
};

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) return;

  ensureDirectoryExistence(dirname);

  fs.mkdirSync(dirname);
};

recursive("./node_modules/device-detector", [ignoreFilter], (err, files) => {
  for (const file of files) {
    let destination = file.replace(RegExp(".yml$", "i"), ".json");
    destination = destination.replace("node_modules/device-detector", "fixtures");
    destination = destination.replace("node_modules\\device-detector", "fixtures");

    ensureDirectoryExistence(destination);

    const yaml = loadYaml(file);
    const json = JSON.stringify(yaml);

    fs.writeFileSync(destination, json);
  }
});
