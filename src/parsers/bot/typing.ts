export interface BotResult {
  name: string;
  category: string;
  url: string;
  producer: {
    name: string;
    url: string;
  }
}

export type Result = BotResult | null;
