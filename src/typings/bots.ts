export interface Bot {
  regex: string;
  name: string;
  category: string;
  url: string;
  producer: {
    name: string;
    url: string;
  }
}

export type Bots = Bot[];