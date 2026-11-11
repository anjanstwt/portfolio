import { FiArrowUpRight } from "react-icons/fi";
import user from "@/data/user.data";
import Block from "@/components/home/block/Block";

const contacts = [
    { kind: "email", label: "Email" },
    { kind: "github", label: "GitHub" },
    { kind: "x", label: "X" },
    { kind: "linkedin", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="mb-8 w-full">
            <Block className="aspect-auto">
                <div className="flex w-full flex-wrap items-baseline justify-between gap-2 px-4 py-6">
                    <p className="text-fg font-medium">{user.name}</p>
                    <p className="text-mute text-xs">Thanks for stopping by.</p>
                </div>
                <div className="grid w-full grid-cols-2 gap-px border-t border-edge bg-edge md:grid-cols-4">
                    {contacts.map(({ kind, label }) => {
                        const contact = user.contacts.find((contact) => contact.kind === kind);

                        if (!contact) return null;

                        return (
                            <a
                                key={kind}
                                href={contact.href}
                                target={kind === "email" ? undefined : "_blank"}
                                rel={kind === "email" ? undefined : "noopener noreferrer"}
                                className="flex min-h-24 min-w-0 items-center justify-between gap-3 bg-block p-4 text-mute transition-colors duration-200 hover:bg-page hover:text-fg focus-visible:text-fg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg motion-reduce:transition-none"
                            >
                                <span className="min-w-0 wrap-break-word">{label}</span>
                                <FiArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                            </a>
                        );
                    })}
                </div>
            </Block>
        </footer>
    );
}
