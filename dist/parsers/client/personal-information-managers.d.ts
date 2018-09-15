export interface PersonalInformationManagerResult {
    type: string;
    name: string;
    version: string;
}
interface Options {
    versionTruncation: 0 | 1 | 2 | 3 | null;
}
export default class PersonalInformationManagerParser {
    private readonly options;
    constructor(options?: Partial<Options>);
    parse: (userAgent: string) => PersonalInformationManagerResult;
}
export {};
