"use client";

import Experiences from "../../../data/experience.data";
import { useIslandStore } from "../../../store/island.store";

export default function ExperienceView() {
    const index = useIslandStore((s) => s.experienceIndex);
    const experience = Experiences[index] ?? Experiences[0];

    return (
        <div className="flex h-full w-full items-center justify-center px-4 text-white">
            <span className="truncate text-[12px] font-semibold tracking-tight">
                {experience.company}
            </span>
        </div>
    );
}
