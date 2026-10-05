"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MdVerified } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";
import type { IconType } from "react-icons";
import user from "@/data/user.data";
import type { ContactKind } from "@/types/user.type";
import useClock from "@/hooks/useClock";

const CONTACT_ICONS: Record<ContactKind, IconType> = {
    email: FiMail,
    x: FaXTwitter,
    linkedin: FiLinkedin,
    github: FiGithub,
    resume: FiFileText,
};

export default function HeroSection() {
    const { day, month, time } = useClock();

    return (
        <section className="relative w-full flex flex-col items-center pt-10 pb-6">
            <div className="text-xs tracking-widest text-mute w-full flex justify-between items-center ">
                <div>{day + ", " + month}</div>
                <div>{time}</div>

            </div>

            <div className="relative mt-6 flex flex-col items-center leading-[0.95]">
                <div className="text-[84px] font-semibold text-fg/[0.06] select-none">
                    Anjan
                </div>
                <div className="text-[84px] font-semibold text-fg/[0.06] select-none">
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

            <div className="flex justify-center items-center gap-1 mt-6 ">
                {user.contacts.map((contact, i) => (
                    <a
                        key={contact.kind}
                        href={contact.href}
                        target={"_blank"}
                        className={cn(
                            "w-22 h-8 flex justify-center items-center rounded-sm bg-block shadow-xs ",
                            i === 0 && "rounded-r-sm rounded-l-full ",
                            i === user.contacts.length - 1 && "rounded-l-sm rounded-r-full",
                        )}
                    >
                        {contact.kind}
                    </a>
                ))}
            </div>
        </section>
    );
}
