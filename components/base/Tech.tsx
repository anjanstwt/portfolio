"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Heading from "../ui/Heading";
import { HorizontalGap, VerticalGap } from "../ui/Gap";

type TechItem = {
    logo: string;
    text: string;
    value: number;
};

const techStack: TechItem[] = [
    { logo: "/tech/typescript.png", text: "typescript", value: 15 },
    { logo: "/tech/rust.png", text: "rust", value: 3 },
    { logo: "/tech/solana.png", text: "solana", value: 6 },
    { logo: '/tech/anchor.png', text: 'anchor', value: 6 },
    { logo: "/tech/nextjs.png", text: "next.js", value: 10 },
    { logo: "/tech/nodejs.png", text: "node.js", value: 10 },
    { logo: "/tech/prisma.png", text: "prisma", value: 7 },
    { logo: "/tech/postgresql.png", text: "postgresql", value: 10 },
    { logo: "/tech/websocket.png", text: "websocket", value: 6 },
    { logo: "/tech/docker.png", text: "docker", value: 10 },
    { logo: "/tech/redis.png", text: "redis", value: 8 },
    { logo: "/tech/kubernetes.png", text: "kubernetes", value: 4 },
    { logo: "/tech/git.png", text: "git", value: 9 },
];

const techColors: Record<string, string> = {
    typescript: "#3178c6",
    rust: "#dea584",
    solana: "#9945ff",
    docker: "#2496ed",
    git: "#f14e32",
};

const TECH_CHART_KEYS = [
    "typescript",
    "rust",
    "solana",
    "docker",
    "git",
] as const;

export default function Tech({ className }: { className?: string }) {
    return (
        <div className={cn(
            "w-full text-neutral-400 flex flex-col ",
            className
        )}
        >
            <Heading heading={'stack'} tag={'I generally be with'} />
            <div className="relative flex flex-col gap-y-0">
                <VerticalGap className="h-full absolute left-0 top-0 border-y-0 border-l-0 " />
                <HorizontalGap className="border-x-0 border-t-0 " />
                <div className="flex items-center justify-between gap-4">
                    <div className="w-full flex flex-wrap gap-2 layout-double-padding">
                        {techStack.map((t) => (
                            <TechComponent key={t.text} logo={t.logo} text={t.text} />
                        ))}
                    </div>
                    {/* <TechChart /> */}
                </div>
                <VerticalGap className="h-full absolute right-0 top-0 border-y-0 border-r-0 " />
                <HorizontalGap className="border-x-0 border-b-0 " />
            </div>
        </div>
    );
}

function TechComponent({ logo, text }: { logo: string; text: string }) {
    return (
        <div
            className={cn(
                "w-fit flex items-center gap-x-1 px-3 py-1.5 rounded-md bg-[#101010] border border-neutral-700",
                "cursor-pointer",
            )}
        >
            <Image src={logo} alt={text} width={16} height={16} />
            <span className="text-xs text-white">{text}</span>
        </div>
    );
}

// function TechChart() {
//     const data = techStack
//         .filter((tech) =>
//             TECH_CHART_KEYS.includes(tech.text as (typeof TECH_CHART_KEYS)[number])
//         )
//         .map((tech) => ({
//             title: tech.text,
//             value: tech.value,
//             color: techColors[tech.text] ?? "#737373",
//         }));

//     return (
//         <div className="h-full flex items-center justify-center relative">
//             {/* <VerticalGap className="h-full absolute left-0 top-0 border-y-0 " /> */}
//             <PieChart width={180} height={180}>
//                 <Pie
//                     data={data}
//                     dataKey="value"
//                     nameKey="title"
//                     startAngle={-90}
//                     endAngle={270}
//                     innerRadius={25}
//                     outerRadius={65}
//                     paddingAngle={6}
//                     cornerRadius={6}
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={index} stroke={entry.color} fill={entry.color} />
//                     ))}
//                 </Pie>
//             </PieChart>
//         </div>
//     );
// }

