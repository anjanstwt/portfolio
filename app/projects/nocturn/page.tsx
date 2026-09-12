import type { Metadata } from "next";

import GlassHero from "@/components/Projects/Hero/GlassHero";
import ProjectStory from "@/components/Projects/Story/ProjectStory";
import { getHeroProject, getNextHeroProject } from "@/data/project.data";
import { getStory } from "@/data/story.data";

const project = getHeroProject("nocturn");

export const metadata: Metadata = {
    title: project.name,
    description: project.summary,
};

export default function Page() {
    return (
        <>
            <GlassHero hero={project.hero} />
            <ProjectStory project={project} story={getStory(project.slug)} next={getNextHeroProject(project.slug)} />
        </>
    );
}
