"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type TechItem = {
    logo: string;
    text: string;
    value: number;
};

import { Logos } from "../Logos/Logos";

// Selected tech for the main section
const SELECTED_TECH = [
    "typescript", "rust", "solana", "anchor", "react.js", "next.js", "node.js", "express.js",
    "prisma", "postgresql", "websocket", "docker", "redis", "kubernetes", "git"
];

const techStack = SELECTED_TECH.map(name => {
    const found = Logos.find(l => l.name.toLowerCase() === name.toLowerCase());
    return {
        logo: typeof found?.url === 'string' ? found.url : '',
        icon: typeof found?.url !== 'string' ? found?.url : null,
        text: name,
    };
});

import SectionHeading from "../ui/SectionHeading";

export default function Tech({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex flex-col gap-4", className)}>
            <SectionHeading title="Stack" extra="I generally be with" />
            <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                    <TechComponent key={t.text} logo={t.logo} icon={t.icon} text={t.text} />
                ))}
            </div>
        </section>
    );
}

function TechComponent({ logo, icon, text }: { logo: string; icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-x-2 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
            {logo ? (
                <Image src={logo} alt={text} width={16} height={16} className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity" unoptimized />
            ) : icon ? (
                <div className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center">{icon}</div>
            ) : null}
            <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors capitalize">{text}</span>
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

