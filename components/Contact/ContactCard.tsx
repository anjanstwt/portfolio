import type { ComponentType } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import user from "@/data/user.data";
import type { ContactKind, ContactType } from "@/types/user.type";

interface ContactCardProps {
    className?: string;
}

const icons: Record<ContactKind, ComponentType<{ className?: string }>> = {
    email: MdOutlineEmail,
    x: FaXTwitter,
    linkedin: FaLinkedinIn,
    github: FaGithub,
    resume: FileText,
};

export default function ContactCard({ className }: ContactCardProps) {
    const email = user.contacts.find((c) => c.kind === "email");
    const links = user.contacts.filter((c) => c.kind !== "email");

    return (
        <div
            className={cn(
                "flex h-full w-full flex-col justify-between gap-8 p-2",
                className,
            )}
        >
            <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                    Get in touch
                </span>
                <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                    Let&apos;s build something great.
                </h3>
                <p className="max-w-sm text-sm text-neutral-400">
                    Have a project in mind or just want to say hi? My inbox is
                    always open.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {email && (
                    <a
                        href={email.href}
                        className={cn(
                            "group flex items-center justify-between gap-3 rounded-2xl",
                            "border border-primary-light/10 bg-cement/40 px-5 py-4",
                            "text-white transition-colors hover:border-primary-light/30 hover:bg-cement/70",
                        )}
                    >
                        <span className="flex items-center gap-3 text-sm sm:text-base">
                            <MdOutlineEmail className="h-5 w-5 text-neutral-400" />
                            {email.href.replace("mailto:", "")}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </a>
                )}

                <div className="flex flex-wrap gap-2">
                    {links.map((contact: ContactType) => {
                        const Icon = icons[contact.kind];
                        return (
                            <a
                                key={contact.kind}
                                href={contact.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={contact.label}
                                className={cn(
                                    "flex items-center gap-2 rounded-full border border-primary-light/10",
                                    "bg-cement/40 px-4 py-2 text-sm text-neutral-300",
                                    "transition-colors hover:border-primary-light/30 hover:bg-cement/70 hover:text-white",
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="capitalize">{contact.label}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
