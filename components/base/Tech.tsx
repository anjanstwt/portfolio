"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

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

export default function Tech({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex flex-col gap-6", className)}>
            <div className="-mx-6 w-[calc(100%+3rem)] border-y border-neutral-800 bg-neutral-900/40 px-6 py-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                    <TechComponent key={t.text} logo={t.logo} text={t.text} />
                ))}
            </div>
        </section>
    );
}

function TechComponent({ logo, text }: { logo: string; text: string }) {
    return (
        <div className="flex items-center gap-x-2 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
            <Image src={logo} alt={text} width={16} height={16} className="opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors">{text}</span>
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

