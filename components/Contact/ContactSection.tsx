import type { ComponentType } from "react";
import { FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import GithubContribution from "./GithubContribution";
import Block from "../ui/Block";
import user from "@/data/user.data";
import type { ContactKind } from "@/types/user.type";

const icons: Record<ContactKind, ComponentType<{ className?: string }>> = {
    email: MdOutlineEmail,
    x: FaXTwitter,
    linkedin: FaLinkedinIn,
    github: FaGithub,
    resume: FileText,
};

export default function ContactSection() {
    return (
        <section
            className="min-h-screen w-full bg-ink px-6 py-24 text-white md:p-20"
            aria-label="Contact"
        >
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase tracking-[0.35em] text-primary-light/50">
                        Get in touch
                    </span>
                    <h2 className="text-4xl font-black text-primary-light md:text-6xl">
                        Let&apos;s talk
                    </h2>
                    <p className="max-w-xl text-sm text-primary-light/60 md:text-base">
                        Open to interesting problems, collaborations, and the odd good
                        conversation. Reach out through any of the channels below.
                    </p>
                </div>

                <Block
                    className={cn(
                        "p-6 shadow-none md:p-8",
                        "grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-x-6"
                    )}
                >
                    <GithubContribution className="md:col-span-4" />

                    <div className="flex flex-col gap-2 border-t border-grub pt-6 md:col-span-2 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                        {user.contacts.map((contact) => {
                            const Icon = icons[contact.kind];
                            return (
                                <a
                                    key={contact.kind}
                                    href={contact.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                        "group flex items-center justify-between rounded-2xl px-3 py-3",
                                        "text-sm text-primary-light/70 transition-colors",
                                        "hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon className="h-4 w-4 text-primary-light/50 transition-colors group-hover:text-white" />
                                        <span className="capitalize">{contact.label}</span>
                                    </span>
                                    <span className="text-primary-light/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-light/60">
                                        &rarr;
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </Block>
            </div>
        </section>
    );
}
