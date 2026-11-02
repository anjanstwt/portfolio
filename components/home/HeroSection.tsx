"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MdVerified } from "react-icons/md";
import user from "@/data/user.data";
import useClock from "@/hooks/useClock";

export default function HeroSection() {
    const { day, month, time } = useClock();

    return (
        <section className="relative mb-2 w-full border-[3px] border-black bg-[#fff8e7] text-black shadow-[6px_6px_0_0_#000]">
            <div className="flex min-h-11 w-full items-center justify-between gap-2 border-b-[3px] border-black bg-[#ffe14d] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wider sm:px-6 sm:text-xs">
                <div>{day + ", " + month}</div>
                <div>{time}</div>

            </div>

            <div className="flex flex-col items-center justify-between gap-6 px-5 py-8 min-[480px]:flex-row sm:px-8 sm:py-10">
                <h1 className="text-center text-[64px] leading-[0.9] font-black tracking-tighter min-[480px]:text-left min-[480px]:text-[56px] sm:text-[72px]">
                    <span className="block">Anjan</span>
                    <span className="mt-1 block">Suman</span>
                </h1>

                <div className="shrink-0 rotate-3 border-[3px] border-black bg-[#c4b5fd] p-2 shadow-[5px_5px_0_0_#000]">
                    <div className="relative size-28 border-2 border-black sm:size-32">
                        <Image
                            src="/images/pfp.png"
                            alt="Anjan"
                            fill
                            className="object-cover"
                            sizes="(min-width: 640px) 128px, 112px"
                            unoptimized
                        />
                        <MdVerified aria-hidden="true" className="absolute -right-3 -bottom-3 size-8 rounded-full border-2 border-black bg-[#ffe14d] p-0.5 text-black" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 border-t-[3px] border-black px-4 py-5 sm:px-6">
                {user.contacts.map((contact, i) => (
                    <a
                        key={contact.kind}
                        href={contact.href}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        className={cn(
                            "flex min-h-10 items-center justify-center border-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:translate-x-0.5 active:translate-y-0.5 motion-reduce:transition-none sm:px-4",
                            i === 0 && "bg-[#ffe14d]",
                            i === user.contacts.length - 1 && "bg-[#c4b5fd]",
                        )}
                    >
                        {contact.kind}
                    </a>
                ))}
            </div>
        </section>
    );
}
