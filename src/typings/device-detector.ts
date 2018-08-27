export interface Browser {
  regex: string;
  name: string;
  version: string;
  engine?: {
    default: string,
    versions?: {
      [key: string]: string;
    }
  };
}

export interface BrowserEngine {
  regex: string;
  name: string;
}

export interface BrowserTest {
  user_agent: string;
  client: {
    type: string;
    name: string;
    short_name: string;
    version: string;
    engine?: string;
    engine_version?: string;
  };
}

export type Browsers = Browser[];
export type BrowserEngines = BrowserEngine[];
export type BrowserTests = BrowserTest[];