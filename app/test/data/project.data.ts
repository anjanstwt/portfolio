import { ProjectHero, ProjectType } from "../types/project.type";

const Projects: ProjectType[] = [
    {
        name: "Winterfell",
        slug: "winterfell",
        summary: "AI and Kubernetes orchestrated Solana Smart Contract generator, builder, tester, and deployer.",
        color: "#6c44fc",
        logo: "/projects/winterfell/logo2.png",
        links: [
            { kind: "live", href: "https://winterfell.dev" },
            { kind: "repo", href: "https://github.com/bottle-nex/winterfell" },
        ],
        hero: {
            fill: "flat",
            haloColor: "#6c44fc",
            // LiaServicestack from react-icons/lia.
            glyph: {
                width: 32,
                height: 32,
                shapes: [
                    {
                        color: "#6c44fc",
                        d: "M 10 6 C 11.544 7.76 12.275797 10.149375 12.216797 12.609375 C 16.184797 14.279375 22.141437 18.73 23.398438 25 L 28 25 C 26.051 14.31 14.918 6.77 10 6 z M 8 13 C 12.67 17.913 8.81 24.582 4 25 L 22.970703 25 C 21.500703 18.289 11.95 13.533 8 13 z",
                    },
                ],
            },
        },
    },
    {
        name: "OrderBook",
        slug: "orderbook",
        summary: "RustLang based extreme low latency orderbook, with O(1) next best price finder.",
        color: "#61784D",
        logo: "/projects/orderbook/logo2.png",
        hero: {
            fill: "flat",
            haloColor: "#61784D",
            // No vector mark yet, so the hero shows the raster logo instead.
            image: "/projects/orderbook/logo2.png",
        },
    },
    {
        name: "HighGarden",
        slug: "highgarden",
        summary: "Prediction Marketplace based on Solana chain, with prefilled liquidity and market makers from Polymarket",
        color: "#ff4000",
        logo: "/projects/highgarden/logo2.png",
        hero: {
            fill: "flat",
            haloColor: "#FF4000",
            // Three stacked bars, stepping darker down the stack.
            glyph: {
                width: 44,
                height: 43,
                shapes: [
                    {
                        color: "#FF3F02",
                        d: "M10.4993 16.5H3.20055C1.43324 16.5 0 17.9327 0 19.7V22.5H11C13.7614 22.5 16 20.2614 16 17.5C16 14.7386 18.2386 12.5 21 12.5H40C42.2091 12.5 44 10.7091 44 8.5V5.5H21.5C18.4624 5.5 16 7.96243 16 11C16 14.0376 13.5369 16.5 10.4993 16.5Z",
                    },
                    {
                        color: "#B73312",
                        d: "M10.4993 26.5H3.20055C1.43324 26.5 0 27.9327 0 29.7V32.5H11C13.7614 32.5 16 30.2614 16 27.5C16 24.7386 18.2386 22.5 21 22.5H34C36.2091 22.5 38 20.7091 38 18.5V15.5H21.5C18.4624 15.5 16 17.9624 16 21C16 24.0376 13.5369 26.5 10.4993 26.5Z",
                    },
                    {
                        color: "#872914",
                        d: "M10.4993 36.5H3.20055C1.43324 36.5 0 37.9327 0 39.7V42.5H11C13.7614 42.5 16 40.2614 16 37.5C16 34.7386 18.2386 32.5 21 32.5H28.8C30.5673 32.5 32 31.0673 32 29.3V25.5H21.5C18.4624 25.5 16 27.9624 16 31C16 34.0376 13.5369 36.5 10.4993 36.5Z",
                    },
                ],
            },
        },
    },
    {
        name: "Nocturn",
        slug: "nocturn",
        summary: "Nocturn.",
        color: "#ffffff",
        links: [
            { kind: "live", href: "https://nocturn.app" },
            { kind: "repo", href: "https://github.com/celestium-x/nocturn" },
        ],
        hero: {
            fill: "glass",
            // Outer contour of the vscode-codicons "cursor" icon, without the
            // inner cut so the arrow renders solid.
            glyph: {
                width: 16,
                height: 16,
                shapes: [
                    {
                        d: "M4.00165 2.99863C4.00165 2.17447 4.94264 1.70412 5.60184 2.19877L13.5993 8.19993C14.3679 8.77665 13.96 9.99978 12.9991 9.99978H9.05388C8.74293 9.99978 8.44968 10.1444 8.26043 10.3911L5.7951 13.6051C5.21352 14.3633 4.00165 13.952 4.00165 12.9964V2.99863Z",
                    },
                ],
            },
        },
    },
    {
        name: "Matcha",
        slug: "trymatcha",
        summary: "Picks issues off your board, ships the fix inside a sandboxed runner, and opens the PR for review.",
        color: "#cdc4f6",
        hero: {
            fill: "glass",
            glyph: {
                width: 792,
                height: 460,
                shapes: [
                    {
                        d: "M626.9 24.4L657 40.8L657 215.5L759.9 147L792 164.5L792 438.5L657 438.5L657 214.6L328.7 447.2L328.7 227.2L0 460.1L0 235.9L297.9 37.4L328.7 54.2L328.7 223Z",
                    },
                ],
            },
        },
    },
];

export type HeroProject = ProjectType & { hero: ProjectHero };

// Looks up a project that has a hero page. Throws at build time if a route
// folder points at a slug that has no hero config.
export function getHeroProject(slug: string): HeroProject {
    const project = Projects.find((entry) => entry.slug === slug);
    if (!project?.hero) throw new Error(`No hero project with slug "${slug}"`);
    return project as HeroProject;
}

export default Projects;
