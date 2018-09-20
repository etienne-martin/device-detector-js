"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cameras_1 = __importDefault(require("./cameras"));
const mobiles_1 = __importDefault(require("./mobiles"));
const televisions_1 = __importDefault(require("./televisions"));
const cars_1 = __importDefault(require("./cars"));
const consoles_1 = __importDefault(require("./consoles"));
const portable_media_players_1 = __importDefault(require("./portable-media-players"));
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
