export type AssetKind = "component" | "mark" | "icon" | "image";

export interface AssetType {
    name: string;
    /** Route segment under /assets. Also the key into the view registry. */
    slug: string;
    kind: AssetKind;
    summary: string;
}
