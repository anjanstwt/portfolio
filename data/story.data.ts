import type { ProjectStoryData } from "../types/project.type";

// One story per project page: a few facts beside the lede, then the
// chapters. The images are placeholders (profile shots) until real
// screenshots land — swap the `image` paths and the copy here, nothing else
// needs to change.
const PORTRAIT = "/images/profile.jpeg";
const PORTRAIT_ALT = "/profile.jpg";

const Stories: Record<string, ProjectStoryData> = {
    winterfell: {
        facts: [
            { label: "role", value: "design, engineering" },
            { label: "stack", value: "Next.js, Rust, Anchor, Kubernetes" },
            { label: "year", value: "2025" },
        ],
        chapters: [
            {
                title: "The idea",
                text: "Writing a Solana program is mostly waiting: on toolchains, on test validators, on deploys. Winterfell started as a way to hand all of that to a machine and keep only the thinking.",
                image: PORTRAIT,
            },
            {
                title: "Under the hood",
                text: "Each request becomes a job on a Kubernetes cluster. A worker generates the Anchor program, builds it in isolation, runs the tests, and reports back with logs you can read like a conversation.",
                image: PORTRAIT_ALT,
            },
            {
                title: "In use",
                text: "Describe the contract, watch it compile, and deploy to devnet from the same screen. Iterations that took an afternoon now take a coffee.",
                image: PORTRAIT,
            },
            {
                title: "Where it goes next",
                text: "Mainnet deploys behind a review step, and a library of audited building blocks the generator can lean on instead of starting from zero each time.",
                image: PORTRAIT_ALT,
            },
        ],
    },
    orderbook: {
        facts: [
            { label: "role", value: "engineering" },
            { label: "stack", value: "Rust, WebSocket" },
            { label: "year", value: "2024" },
        ],
        chapters: [
            {
                title: "The idea",
                text: "An order book is a simple thing that has to be fast a million times in a row. This one was built to find out how far Rust could take it without a database in the loop.",
                image: PORTRAIT,
            },
            {
                title: "Under the hood",
                text: "Price levels live in flat arrays with a bitmap over them, so the next best bid or ask is a single instruction away. Matching never allocates on the hot path.",
                image: PORTRAIT_ALT,
            },
            {
                title: "In numbers",
                text: "Sub-microsecond matching on a laptop, with a websocket feed that streams the top of book to every connected client as it changes.",
                image: PORTRAIT,
            },
        ],
    },
    highgarden: {
        facts: [
            { label: "role", value: "design, engineering" },
            { label: "stack", value: "Solana, Next.js, PostgreSQL" },
            { label: "year", value: "2025" },
        ],
        chapters: [
            {
                title: "The idea",
                text: "Prediction markets are only useful when someone is on the other side of the trade. HighGarden opens with liquidity already in place, so the first user is not talking to an empty room.",
                image: PORTRAIT,
            },
            {
                title: "Under the hood",
                text: "Markets settle on Solana. Prices and depth are seeded from Polymarket, and a set of market makers keeps spreads tight while the book fills up on its own.",
                image: PORTRAIT_ALT,
            },
            {
                title: "In use",
                text: "Pick a question, take a side, and watch the odds move. Positions are tokens in your wallet, so you can hold them, trade them, or walk away.",
                image: PORTRAIT,
            },
        ],
    },
    nocturn: {
        facts: [
            { label: "role", value: "design, engineering" },
            { label: "stack", value: "Next.js, TypeScript" },
            { label: "year", value: "2025" },
        ],
        chapters: [
            {
                title: "The idea",
                text: "A quieter place to work at night. Nocturn strips the interface down to the cursor and what it points at.",
                image: PORTRAIT,
            },
            {
                title: "Under the hood",
                text: "Local first, with sync when you want it. Everything you type is on your machine before it is anywhere else.",
                image: PORTRAIT_ALT,
            },
            {
                title: "In use",
                text: "Open it, write, close it. The app stays out of the way, which turned out to be the whole feature.",
                image: PORTRAIT,
            },
        ],
    },
    trymatcha: {
        facts: [
            { label: "role", value: "engineering" },
            { label: "stack", value: "TypeScript, Docker, GitHub API" },
            { label: "year", value: "2025" },
        ],
        chapters: [
            {
                title: "The idea",
                text: "Most tickets on a board are small, well described, and still wait days for someone to pick them up. Matcha picks them up.",
                image: PORTRAIT,
            },
            {
                title: "Under the hood",
                text: "Each issue gets a sandboxed runner with the repo checked out. The agent reads the ticket, makes the change, runs the tests, and only then opens a pull request.",
                image: PORTRAIT_ALT,
            },
            {
                title: "In review",
                text: "You see a normal PR with a normal diff. Approve it, request changes, or close it. Matcha reads the review and tries again.",
                image: PORTRAIT,
            },
            {
                title: "Where it goes next",
                text: "Bigger issues broken into smaller ones automatically, and a memory of what the codebase prefers so the second fix looks like the first.",
                image: PORTRAIT_ALT,
            },
        ],
    },
};

export function getStory(slug: string): ProjectStoryData {
    return Stories[slug] ?? { chapters: [] };
}

export default Stories;
