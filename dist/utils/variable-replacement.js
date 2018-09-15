"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variableReplacement = (template, variables) => {
    const regex = new RegExp(`\\$\\d`, "g");
    if (template === null)
        return "";
    return template.replace(regex, (match) => {
        const index = parseInt(match.substr(1), 10);
        const variable = variables[index - 1];
        return variable || "";
    });
};
