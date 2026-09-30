import type { Metadata } from "next";

import GlassHero from "@/components/projects/hero/GlassHero";
import ProjectStory from "@/components/projects/story/ProjectStory";
import { getHeroProject, getHeroProjects, getNextHeroProject } from "@/data/project.data";
import { getStory } from "@/data/story.data";

type Params = { params: Promise<{ slug: string }> };

// Only slugs with a hero config get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
    return getHeroProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const project = getHeroProject((await params).slug);
    return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
    const project = getHeroProject((await params).slug);
    return (
        <>
            <GlassHero hero={project.hero} />
            <ProjectStory project={project} story={getStory(project.slug)} next={getNextHeroProject(project.slug)} />
        </>
    );
}
