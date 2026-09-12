import type { AssetType } from "../types/asset.type";

// Every piece listed here needs a matching entry in
// components/Assets/views.tsx, which supplies its preview and stage.
const Assets: AssetType[] = [
    {
        name: "Particle Temple",
        slug: "particle-temple",
        kind: "component",
        summary: "A Greek temple rasterised from sixty thousand vertical strands, with a rain of dots drifting off the roof.",
    },
    {
        name: "Gooey",
        slug: "gooey",
        kind: "component",
        summary: "Liquid UI: pieces that touch merge like goo, pieces that part snap free like a droplet, and the text stays crisp.",
    },
    {
        name: "Dynamic Island",
        slug: "dynamic-island",
        kind: "component",
        summary: "A morphing pill that changes shape and content for every state — navbar, music, timer, airdrop and more.",
    },
    {
        name: "Orbit",
        slug: "orbit",
        kind: "component",
        summary: "An orbital line-art diagram drawn in vectors, under a layer of film grain.",
    },
    {
        name: "Clock",
        slug: "clock",
        kind: "component",
        summary: "A slow analogue clock with a stroked face and a sweeping hand.",
    },
    {
        name: "Glass Glyphs",
        slug: "glass-glyphs",
        kind: "component",
        summary: "Project marks given a frosted glass body with a bevelled edge and a ghosted boundary.",
    },
    {
        name: "Safari",
        slug: "safari",
        kind: "component",
        summary: "A Safari window frame that scales its chrome to any size and holds an image or live content.",
    },
    {
        name: "Glass Block",
        slug: "glass-block",
        kind: "component",
        summary: "A blurred glass surface with a hairline shine, used to hold the hero portrait.",
    },
    {
        name: "Contribution Graph",
        slug: "contribution-graph",
        kind: "component",
        summary: "A GitHub contribution calendar in the site's dark palette.",
    },
    {
        name: "Marks",
        slug: "marks",
        kind: "mark",
        summary: "Eight logo marks — tilde, maze, split, window, brackets, stairs, spiral and arch.",
    },
    {
        name: "Icons",
        slug: "icons",
        kind: "icon",
        summary: "Hand-drawn vector icons used across the site.",
    },
    {
        name: "Tech Stack",
        slug: "tech-stack",
        kind: "icon",
        summary: "Logos for the tools the site talks about.",
    },
    {
        name: "Gallery",
        slug: "gallery",
        kind: "image",
        summary: "The photographs that run through the hero's side-scrolling track.",
    },
];

export const kindLabels: Record<AssetType["kind"], string> = {
    component: "component",
    mark: "mark",
    icon: "icon",
    image: "image",
};

export function getAsset(slug: string): AssetType | undefined {
    return Assets.find((asset) => asset.slug === slug);
}

export default Assets;
