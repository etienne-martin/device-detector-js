"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cameras_1 = require("./cameras");
const mobiles_1 = require("./mobiles");
const televisions_1 = require("./televisions");
const cars_1 = require("./cars");
const consoles_1 = require("./consoles");
const portable_media_players_1 = require("./portable-media-players");
const deviceParsers = [
    consoles_1.default,
    cars_1.default,
    cameras_1.default,
    televisions_1.default,
    portable_media_players_1.default,
    mobiles_1.default
];
class ClientParser {
    constructor() {
        this.parse = (userAgent) => {
            for (const Parser of deviceParsers) {
                const parser = new Parser();
                const device = parser.parse(userAgent);
                if (device.type !== "") {
                    return device;
                }
            }
            return null;
        };
    }
}
exports.default = ClientParser;
