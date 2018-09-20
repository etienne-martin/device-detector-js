export interface VendorFragments {
    [brand: string]: string[];
}
export interface VendorFragmentTest {
    useragent: string;
    vendor: string;
}
export declare type VendorFragmentTests = VendorFragmentTest[];
