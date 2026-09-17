import { DetailPanel } from "@/types/detail.type";
import Image from "next/image";
import { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import {
    ClaudeCode,
    Arc,
    Zed,
    Spotify,
    Ghostty,
    Typescript,
    Rust,
    Redis,
    Docker,
    Postgresql,
    Nextjs,
} from "@thesvg/react";

interface DetailsPanelContentProps {
    type: DetailPanel;
}

export default function DetailsPanelContent({
    type,
}: DetailsPanelContentProps) {
    switch (type) {
        case DetailPanel.Workspace:
            return <ContentList content={workspaceContent} />;

        case DetailPanel.Teammates:
            return <ContentList content={teammatesContent} />;

        case DetailPanel.Stack:
            return <ContentList content={stackContent} />;

        case DetailPanel.Application:
            return <ContentList content={applicationContent} />;

        default:
            return null;
    }
}

interface ContentType {
    image: ReactNode;
    title?: string;
    name: string;
    link: string;
}

const workspaceContent: ContentType[] = [
    {
        image: (
            <Image
                src="/gallery/macbook.webp"
                alt="mac"
                width={60}
                height={60}
                unoptimized
            />
        ),
        title: "Apple",
        name: "Macbook Air M4",
        link: "",
    },
    {
        image: (
            <Image
                src="/gallery/samsung.avif"
                alt="earphones"
                width={40}
                height={40}
                unoptimized
            />
        ),
        title: "Samsung",
        name: "IC050",
        link: "",
    },
];

const teammatesContent: ContentType[] = [
    {
        image: (
            <Image
                src="/teammates/praroop.jpeg"
                alt="earphones"
                width={40}
                height={20}
                unoptimized
                className="aspect-square object-cover rounded-xs "
            />
        ),
        name: "Praroop",
        link: "https://praroop.site",
    },
    {
        image: (
            <Image
                src="/teammates/piyush.jpeg"
                alt="earphones"
                width={40}
                height={20}
                unoptimized
                className="aspect-square object-cover rounded-xs "
            />
        ),
        name: "Piyush",
        link: "https://piyushraj.site",
    },
    {
        image: (
            <Image
                src="/teammates/rishi.jpeg"
                alt="earphones"
                width={40}
                height={20}
                unoptimized
                className="aspect-square object-cover rounded-xs "
            />
        ),
        name: "Rishi",
        link: "https://kantrishi.com",
    },
];

const stackContent: ContentType[] = [
    {
        image: <Typescript className="size-6.5" />,
        name: "TypeScript",
        link: "https://www.typescriptlang.org",
    },
    {
        image: <Rust className="size-7" />,
        name: "Rust",
        link: "https://www.rust-lang.org",
    },
    {
        image: <Nextjs className="size-7" />,
        name: "Next.js",
        link: "https://nextjs.org",
    },
    {
        image: <Redis className="size-7" />,
        name: "Redis",
        link: "https://redis.io",
    },
    {
        image: <Docker className="size-7" />,
        name: "Docker",
        link: "https://www.docker.com",
    },
    {
        image: <Postgresql className="size-7" />,
        name: "PostgreSQL",
        link: "https://www.postgresql.org",
    },
];

const applicationContent: ContentType[] = [
    {
        image: <Zed className="size-7 " />,
        name: "Zed",
        link: "https://zed.dev",
    },
    {
        image: <ClaudeCode className="size-9 " />,
        name: "Claude Code",
        link: "https://claude.ai",
    },
    {
        image: <Spotify className="size-7.5 " />,
        name: "Spotify",
        link: "https://spotify.com",
    },
    {
        image: <Arc className="size-8.5 " />,
        name: "Arc",
        link: "https://arc.net",
    },
    {
        image: <Ghostty className="size-9 " />,
        name: "Ghostty",
        link: "https://warp.dev",
    },
];

function ContentList({ content }: { content: ContentType[] }) {
    return (
        <div className="h-full w-full p-1 flex flex-col gap-y-0.5 ">
            {content.map(({ image, title, name, link }) => (
                <a
                    key={name}
                    href={link}
                    target={"_blank"}
                    className="contents"
                >
                    <div className="w-full h-12 flex justify-between items-center pl-1 pr-2 hover:bg-blade/30 transition-colors duration-200 ease-in-out rounded-sm ">
                        <div className="flex justify-start items-center gap-x-1 ">
                            <div className="w-15 flex justify-center items-center ">
                                {image}
                            </div>
                            <div className="flex flex-col justify-center items-start gap-y-0.5 ">
                                <div className="text-xs text-steel ">
                                    {title}
                                </div>
                                <div className="text-sm text-neutral-100 ">
                                    {name}
                                </div>
                            </div>
                        </div>
                        <FiArrowUpRight className="text-neutral-100 " />
                    </div>
                </a>
            ))}
        </div>
    );
}
