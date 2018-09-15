export interface BotResult {
    name: string;
    category: string;
    url: string;
    producer: {
        name: string;
        url: string;
    };
}
export declare type Result = BotResult | null;
export default class BotParser {
    parse: (userAgent: string) => Result;
}
