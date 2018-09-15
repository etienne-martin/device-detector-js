"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildModel = (model) => {
    model = model.replace(/_/g, " ");
    model = model.replace(RegExp(" TD$", "i"), "");
    if (model === "Build") {
        return "";
    }
    return model;
};
