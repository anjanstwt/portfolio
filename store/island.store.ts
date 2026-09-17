import { create } from "zustand";
import type { IslandState, SectionId } from "../types/island.type";

interface IslandStore {
    state: IslandState;
    section: SectionId | null;
    projectIndex: number;
    experienceIndex: number;
    tray: IslandTray;
    activate: (section: SectionId, state: IslandState) => void;
    setState: (state: IslandState) => void;
    setProjectIndex: (i: number) => void;
    setExperienceIndex: (i: number) => void;
    setTray: (tray: IslandTray) => void;
}

export type IslandTray = "projects" | "experience" | "contact" | null;

export const useIslandStore = create<IslandStore>((set) => ({
    state: "navbar",
    section: null,
    projectIndex: 0,
    experienceIndex: 0,
    tray: null,
    activate: (section, state) => set({ section, state }),
    setState: (state) => set({ state }),
    setProjectIndex: (projectIndex) => set({ projectIndex }),
    setExperienceIndex: (experienceIndex) => set({ experienceIndex }),
    setTray: (tray) => set({ tray }),
}));
