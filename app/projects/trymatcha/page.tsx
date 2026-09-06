import type { Metadata } from "next";

import GlassHero from "@/components/Projects/Hero/GlassHero";
import { getHeroProject } from "@/data/project.data";

const project = getHeroProject("trymatcha");

export const metadata: Metadata = {
    title: project.name,
    description: project.summary,
};

export default function Page() {
    return <GlassHero hero={project.hero} />;
}
