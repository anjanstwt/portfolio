import { Roboto } from "next/font/google";
import { IconBrandGithub, IconWifi, IconWifiOff } from "@tabler/icons-react";

const roboto = Roboto({
    subsets: ["latin"]
});

interface ProjectCardProps {
    name: string,
    description?: string,
    img: React.ReactNode
    skills: string[],
    github: string,
    live?: string,
    positionCount: number,
    className?: string
}

export const ProjectCard = ({ name, description, img, skills, github, live, positionCount, className }: ProjectCardProps) => {
    return positionCount % 2 !== 0 ?
        <ProjectCardLeft name={name} description={description} img={img} skills={skills} github={github} live={live} className={className} />
        :
        <ProjectCardRight name={name} description={description} img={img} skills={skills} github={github} live={live} className={className} />
}

interface ProjectCard {
    name: string,
    description?: string,
    img: React.ReactNode
    skills: string[],
    github: string,
    live?: string,
    className?: string
}

const ProjectCardLeft = ({ name, description, img, skills, github, live, className }: ProjectCard) => {
    return <div className={`${className} w-full flex justify-start items-center gap-x-2 `}>

        {/* image and optional links */}
        <div className="flex flex-col justify-around items-start gap-y-2 ">
            <div className="relative w-40 2xl:w-44 h-24 2xl:h-28 rounded overflow-hidden bg-[#50130E] flex-shrink-0">
                {img}
            </div>
            <div className="flex 2xl:hidden justify-center items-center gap-x-3 ">
                <a
                    className=" "
                    href={github}
                    target="_blank"
                >
                    <IconBrandGithub />
                </a>
                {
                    live ?
                        <a
                            href={live}
                            target="_blank"
                        >
                            <IconWifi />
                        </a> : <a
                            className="cursor-pointer "
                        >
                            <IconWifiOff />
                        </a>
                }
            </div>
        </div>

        {/* details */}
        <div className="h-full flex flex-col items-start justify-start ">
            <div className="h-full flex flex-col items-start justify-around ">
                <div className="flex flex-col  ">
                    <div className="text-lg 2xl:text-xl ">
                        {name}
                    </div>
                    <div className={`text-xs relative -top-0.5 ${roboto.className} `}>
                        {description}
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 2xl:gap-1.5 ">
                    {skills.map((name, index) => (
                        <Capsule name={name} key={index} />
                    ))}
                </div>
            </div>
        </div>

        {/* links */}
        <div className="h-full hidden 2xl:flex flex-col justify-center items-center gap-y-3 ">
            <a
                className=" "
                href={github}
                target="_blank"
            >
                <IconBrandGithub />
            </a>
            {
                live ?
                    <a
                        href={live}
                        target="_blank"
                    >
                        <IconWifi />
                    </a> : <a
                        className="cursor-pointer "
                    >
                        <IconWifiOff />
                    </a>
            }
        </div>
    </div>
};

const ProjectCardRight = ({ name, description, img, skills, github, live, className }: ProjectCard) => {
    return <div className={`${className} w-full flex justify-end items-start gap-x-2 `}>

        {/* links */}
        <div className="h-full hidden 2xl:flex flex-col justify-center items-center gap-y-3 ">
            <a
                className=" "
                href={github}
                target="_blank"
            >
                <IconBrandGithub />
            </a>
            {
                live ?
                    <a
                        href={live}
                        target="_blank"
                    >
                        <IconWifi />
                    </a> : <a
                        className="cursor-pointer "
                    >
                        <IconWifiOff />
                    </a>
            }
        </div>

        {/* details */}
        <div className="h-full flex flex-col items-end justify-between  ">
            <div className="h-full flex flex-col items-end justify-around ">
                <div className="flex flex-col  ">
                    <div className="text-end text-lg 2xl:text-xl ">
                        {name}
                    </div>
                    <div className={`text-xs relative -top-0.5 ${roboto.className} `}>
                        {description}
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 2xl:gap-1.5 justify-end ">
                    {skills.map((name, index) => (
                        <Capsule name={name} key={index} />
                    ))}
                </div>
            </div>
        </div>

        {/* image and optional links */}
        <div className="flex flex-col justify-around items-end gap-y-2 ">
            <div className="relative w-40 2xl:w-44 h-24 2xl:h-28 rounded overflow-hidden bg-[#50130E] flex-shrink-0">
                {img}
            </div>
            <div className="flex 2xl:hidden justify-center items-center gap-x-3 ">
                {
                    live ?
                        <a
                            href={live}
                            target="_blank"
                        >
                            <IconWifi />
                        </a> : <a
                            className="cursor-pointer "
                        >
                            <IconWifiOff />
                        </a>
                }
                <a
                    className=" "
                    href={github}
                    target="_blank"
                >
                    <IconBrandGithub />
                </a>
            </div>
        </div>
    </div>
}

const Capsule = ({ name }: { name: string }) => {
    return <div className={`px-2 py-1 rounded bg-[#3d3932] text-[10px] 2xl:text-xs font-light text-[#D8CFBC] ${roboto.className} `}>
        {name}
    </div>
}