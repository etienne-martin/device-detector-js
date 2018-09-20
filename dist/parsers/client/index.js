"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("./browser"));
const mobile_apps_1 = __importDefault(require("./mobile-apps"));
const feed_readers_1 = __importDefault(require("./feed-readers"));
const libraries_1 = __importDefault(require("./libraries"));
const media_players_1 = __importDefault(require("./media-players"));
const personal_information_managers_1 = __importDefault(require("./personal-information-managers"));
const clientParsers = [
    feed_readers_1.default,
    mobile_apps_1.default,
    media_players_1.default,
    personal_information_managers_1.default,
    browser_1.default,
    libraries_1.default
];
class ClientParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            for (const Parser of clientParsers) {
                const parser = new Parser(this.options);
                const client = parser.parse(userAgent);
                if (client.type !== "") {
                    return client;
                }
            }
            return null;
        };
        this.options = Object.assign({}, this.options, options);
    }
}
exports.default = ClientParser;
