"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MdVerified } from "react-icons/md";
import { FaXTwitter, FaThreads, FaTiktok } from "react-icons/fa6";
import { FiInstagram, FiYoutube } from "react-icons/fi";

const SOCIALS = [
    { icon: FaXTwitter, href: "https://x.com/anjanstwt" },
    { icon: FaThreads, href: "#" },
    { icon: FiInstagram, href: "#" },
    { icon: FaTiktok, href: "#" },
    { icon: FiYoutube, href: "#" },
];

function formatClock(date: Date) {
    const day = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const time = date
        .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
        .toUpperCase();
    return `${day}, ${month} ${date.getDate()}, ${time}`;
}

function useClock() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 30_000);
        return () => clearInterval(id);
    }, []);

    return now;
}

export default function HeroSection() {
    const now = useClock();

    return (
        <section className="relative w-full flex flex-col items-center pt-10 pb-16">
            <div className="font-mono text-sm tracking-widest text-steel">
                {now ? formatClock(now) : " "}
            </div>

            <div className="relative mt-6 flex flex-col items-center leading-[0.95]">
                <div className="text-[84px] font-semibold text-white/[0.06] select-none">
                    Anjan
                </div>
                <div className="text-[84px] font-semibold text-white/[0.06] select-none">
                    Suman
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative size-18 rounded-full ">
                        <Image
                            src="/images/pfp.png"
                            alt="Anjan"
                            fill
                            className="object-cover rounded-full"
                            unoptimized
                        />
                        <MdVerified className="absolute z-20 -bottom-0.5 -right-0.5 text-[#1d9bf0] rounded-full size-6 p-0.5" />
                    </div>
                </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, href }, i) => (
                    <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center justify-center",
                            "size-14 rounded-full",
                            "bg-white/[0.04] border border-white/5",
                            "text-steel hover:text-neutral-100 hover:bg-white/[0.08]",
                            "transition-colors",
                        )}
                    >
                        <Icon className="size-5" />
                    </a>
                ))}
            </div>
        </section>
    );
}
