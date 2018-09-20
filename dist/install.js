"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const YAML = require("js-yaml");
const loadYaml = (slug) => {
    return YAML.load(fs.readFileSync(slug, "utf8"), {
        schema: YAML.FAILSAFE_SCHEMA
    });
};
const recursive = require("recursive-readdir");
function ignoreFilter(file, stats) {
    if (stats.isDirectory())
        return false;
    return !(stats.isFile() && path.extname(file) === ".yml");
}
// Ignore files named "foo.cs" and descendants of directories named test
recursive("./php_modules/device-detector", [ignoreFilter], (err, files) => {
    for (const file of files) {
        const destination = file.replace(RegExp(".yml$", "i"), ".json");
        fs.writeFileSync(destination, JSON.stringify(loadYaml(file)));
    }
});
