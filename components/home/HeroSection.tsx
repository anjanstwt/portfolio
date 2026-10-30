"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MdVerified } from "react-icons/md";
import user from "@/data/user.data";
import useClock from "@/hooks/useClock";

export default function HeroSection() {
    const { day, month, time } = useClock();

    return (
        <section className="relative w-full flex flex-col items-center pt-10 pb-6">
            <div className="text-xs tracking-widest text-mute w-full flex justify-between items-center ">
                <div>{day + ", " + month}</div>
                <div>{time}</div>

            </div>

            <div className="relative mt-6 flex flex-col items-center leading-[0.95]">
                <div className="text-[84px] font-bold text-fg select-none tracking-tight">
                    Anjan
                </div>
                <div className="text-[84px] font-bold text-fg select-none tracking-tight">
                    Suman
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative size-22 rounded-xl border-3 border-fg shadow-[4px_4px_0px_0px_var(--t-fg)] bg-yellow-400 p-1">
                        <Image
                            src="/images/pfp.png"
                            alt="Anjan"
                            fill
                            className="object-cover rounded-lg"
                            unoptimized
                        />
                        <MdVerified className="absolute z-20 -bottom-1 -right-1 text-[#1d9bf0] rounded-full size-6 p-0.5 border-2 border-fg bg-block" />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-6 ">
                {user.contacts.map((contact, i) => (
                    <a
                        key={contact.kind}
                        href={contact.href}
                        target={"_blank"}
                        className={cn(
                            "max-[480px]:w-14 max-[480px]:text-[10px] max-[480px]:h-6 w-22 h-8 flex justify-center items-center rounded-md border-2 border-fg shadow-[3px_3px_0px_0px_var(--t-fg)] bg-pink-400 text-xs font-medium text-fg hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_var(--t-fg)] transition-all duration-100",
                        )}
                    >
                        {contact.kind}
                    </a>
                ))}
            </div>
        </section>
    );
}
