import { Result } from "./typing";
interface Options {
    cache: boolean | number;
}
declare class BotParser {
    private readonly cache;
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => Result;
}
export = BotParser;
