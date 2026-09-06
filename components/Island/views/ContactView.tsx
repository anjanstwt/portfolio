"use client";

import type { ComponentType } from "react";
import { FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import ToolTipComponent from "@/components/ui/TooltipComponent";
import user from "../../../data/user.data";
import type { ContactKind } from "../../../types/user.type";

const icons: Record<ContactKind, ComponentType<{ className?: string }>> = {
    email: MdOutlineEmail,
    x: FaXTwitter,
    linkedin: FaLinkedinIn,
    github: FaGithub,
    resume: FileText,
};

export default function ContactView() {
    return (
        <div className="flex h-full w-full items-center justify-center gap-1 px-2 text-white">
            {user.contacts.map((contact) => {
                const Icon = icons[contact.kind];
                return (
                    <ToolTipComponent key={contact.kind} content={contact.label} className="bg-cement/10 border border-cement">
                        <a
                            href={contact.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={contact.label}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Icon className="h-4 w-4" />
                        </a>
                    </ToolTipComponent>
                );
            })}
        </div>
    );
}
