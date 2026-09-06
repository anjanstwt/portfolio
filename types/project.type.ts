export interface GlyphShape {
    /** SVG path data in the glyph's own viewBox space. */
    d: string;
    /** Flat fill for this shape. Used when the hero's fill mode is "flat". */
    color?: string;
}

export interface ProjectGlyph {
    width: number;
    height: number;
    shapes: GlyphShape[];
}

export interface ProjectHero {
    /** Vector mark. Gets the glass treatment and the ghosted outline. */
    glyph?: ProjectGlyph;
    /** Raster fallback shown in the glyph's place when there is no vector mark. */
    image?: string;
    /** "glass" paints a frosted white body; "flat" uses each shape's own color. */
    fill: "glass" | "flat";
    /** Tint of the halo behind the floating glyph. White when omitted. */
    haloColor?: string;
}

export type ProjectLinkKind = "live" | "repo";

export interface ProjectLink {
    kind: ProjectLinkKind;
    href: string;
}

export interface ProjectType {
    name: string;
    /** Route segment under /projects. */
    slug: string;
    summary: string;
    color?: string;
    /** Raster logo used by the side capsule. Falls back to the hero glyph. */
    logo?: string;
    /** Present when the project has a /projects/<slug> hero page. */
    hero?: ProjectHero;
    /** External links shown when the dynamic island's project state is hovered. */
    links?: ProjectLink[];
}
