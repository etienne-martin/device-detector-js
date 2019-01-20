export interface VendorFragments {
    [brand: string]: string[];
}
/** TEST TYPES */
export interface VendorFragmentTest {
    useragent: string;
    vendor: string;
}
export declare type VendorFragmentTests = VendorFragmentTest[];
