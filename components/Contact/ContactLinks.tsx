"use client";

import type { ComponentType } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import user from "@/data/user.data";
import type { ContactKind } from "@/types/user.type";

const icons: Record<ContactKind, ComponentType<{ className?: string }>> = {
    email: MdOutlineEmail,
    x: FaXTwitter,
    linkedin: FaLinkedinIn,
    github: FaGithub,
    resume: FileText,
};

interface ContactLinksProps {
    className?: string;
}

export default function ContactLinks({ className }: ContactLinksProps) {
    return (
        <div className={cn("grid grid-cols-1 gap-3", className)}>
            {user.contacts.map((contact) => {
                const Icon = icons[contact.kind];
                return (
                    <a
                        key={contact.kind}
                        href={contact.href}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                            "group flex items-center gap-3 rounded-2xl border border-primary-light/10",
                            "bg-cement/40 px-4 py-3 text-neutral-300",
                            "transition-colors hover:border-primary-light/20 hover:bg-cement/70 hover:text-white",
                        )}
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-neutral-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
                            <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm capitalize tracking-wide">
                            {contact.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </a>
                );
            })}
        </div>
    );
}
