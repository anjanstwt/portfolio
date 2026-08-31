'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Block from "../../ui/Block";

interface SkillCardProps {
    name: string;
    logo: string;
    index: number;
}

export default function SkillCard({ name, logo, index }: SkillCardProps) {
    return (
        <Block
            className={cn(
                "group relative flex flex-col items-center justify-center gap-3 p-6",
                "bg-cement/5 backdrop-blur-sm",
                "hover:bg-cement/10 transition-all duration-300",
                "cursor-default",
            )}
        >
            <div className={cn(
                "relative w-16 h-16 flex items-center justify-center",
                "bg-ink/50 rounded-2xl p-3",
                "border border-primary-light/10",
                "group-hover:border-primary-light/30 transition-colors duration-300",
            )}>
                <Image
                    src={logo}
                    alt={name}
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>
            <span className={cn(
                "text-sm font-medium text-primary-light/70",
                "group-hover:text-primary-light transition-colors duration-300",
            )}>
                {name}
            </span>
        </Block>
    );
}
