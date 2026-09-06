import type { IslandDimensions, IslandState, SectionId } from "../types/island.type";

// Add a new state here (and to IslandState), then register its view in
// components/Island/views/index.ts.

/** Navbar entries, in order. Each id is a section wrapped by IslandSection on the page. */
export const navItems: { id: SectionId; label: string }[] = [
    { id: "intro", label: "intro" },
    { id: "projects", label: "projects" },
    { id: "experience", label: "experience" },
    { id: "contact", label: "contacts" },
    { id: "end", label: "end" },
];
export const islandDimensions: Record<IslandState, IslandDimensions> = {
    navbar: { width: "auto", height: 36, borderRadius: 20 },
    project: { width: "auto", height: "auto", borderRadius: 22 },
    experience: { width: "auto", height: 40, borderRadius: 20 },
    contact: { width: "auto", height: 44, borderRadius: 22 },
    idle: { width: 150, height: 38, borderRadius: 19 },
    ring: { width: 260, height: 44, borderRadius: 22 },
    timer: { width: 300, height: 70, borderRadius: 30 },
    record: { width: 180, height: 40, borderRadius: 20 },
    music: { width: 320, height: 200, borderRadius: 32 },
    airdrop: { width: 320, height: 240, borderRadius: 44 },
    airdropMini: { width: 250, height: 44, borderRadius: 22 },
    lowBattery: { width: 230, height: 42, borderRadius: 21 },
    phone: { width: 340, height: 80, borderRadius: 36 },
    findmy: { width: 290, height: 60, borderRadius: 26 },
    screenRecord: { width: 220, height: 40, borderRadius: 20 },
};

export const islandStates: IslandState[] = [
    "navbar",
    "project",
    "experience",
    "contact",
    "idle",
    "ring",
    "timer",
    "record",
    "music",
    "airdrop",
    "airdropMini",
    "lowBattery",
    "phone",
    "findmy",
    "screenRecord",
];
