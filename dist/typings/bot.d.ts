export interface Bot {
    regex: string;
    name: string;
    category?: string;
    url?: string;
    producer?: {
        name: string;
        url: string;
    };
}
export declare type Bots = Bot[];
/** TEST TYPES */
export interface BotTest {
    user_agent: string;
    bot: {
        name: string;
        category?: string;
        url: string;
        producer?: {
            name: string;
            url: string;
        };
    };
}
export declare type BotTests = BotTest[];
