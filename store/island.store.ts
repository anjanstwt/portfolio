import { create } from "zustand";
import type { IslandState, SectionId } from "../types/island.type";

interface IslandStore {
    /** What the island is currently showing. */
    state: IslandState;
    /** Section currently under the viewport center. */
    section: SectionId | null;
    /** Index into project.data — the project nearest the viewport center. */
    projectIndex: number;
    /** Index into experience.data — the company the experience section is showing. */
    experienceIndex: number;
    activate: (section: SectionId, state: IslandState) => void;
    setState: (state: IslandState) => void;
    setProjectIndex: (i: number) => void;
    setExperienceIndex: (i: number) => void;
}

export const useIslandStore = create<IslandStore>((set) => ({
    state: "navbar",
    section: null,
    projectIndex: 0,
    experienceIndex: 0,
    activate: (section, state) => set({ section, state }),
    setState: (state) => set({ state }),
    setProjectIndex: (projectIndex) => set({ projectIndex }),
    setExperienceIndex: (experienceIndex) => set({ experienceIndex }),
}));
