import { BotResult } from "./typing";
declare namespace BotParser {
    type Result = BotResult | null;
    interface Options {
        cache: boolean | number;
    }
}
declare class BotParser {
    private readonly cache;
    private readonly options;
    constructor(options?: Partial<BotParser.Options>);
    parse: (userAgent: string) => BotParser.Result;
}
export = BotParser;
