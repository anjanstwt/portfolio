'use client'
import { useParams } from "next/navigation";
import { Quicksand } from "next/font/google";
import DustParticles from "@/components/ui/DustParticles";
import { projects } from "@/components/data/projects";
import Links from "@/components/project/Links";
import Stacks from "@/components/project/Stack";
const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

// add error page here and tag it like oops I think I didn't make this project, wanna make it together??
export default function Page() {

    const params = useParams();
    const project = params.project as string;
    const currentProject = projects.find(p => p.title === project);

    return (
        <div className="flex flex-col items-center gap-y-6">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col">
                    <div className={`text-white text-3xl ${quicksand.className} font-extrabold flex items-center gap-x-1`}>
                        {project}
                    </div>
                    <Links
                        live={currentProject?.live}
                        repo={currentProject?.repo!}
                        x={currentProject?.x}
                        isPrivate={currentProject?.isPrivate!}
                    />
                </div>
            </div>

            {/* this is for images of the project */}
            <div className="w-full flex items-center justify-center">
                <div className="w-full h-80 bg-neutral-900 rounded">

                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                {projects.find(p => p.title === params.project)?.description || ''}
            </div>

            <Stacks
                stacks={currentProject?.tech!}
            />

            <DustParticles particleColor={0xfdf9f0} />
        </div>
    );
}
