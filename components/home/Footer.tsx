import Block from "@/components/home/block/Block";
import user from "@/data/user.data";
import { ContactKind } from "@/types/user.type";

const contactLabels: Record<ContactKind, string> = {
    email: "Email",
    resume: "Résumé",
    github: "GitHub",
    x: "X",
    linkedin: "LinkedIn",
};

const groups = [
    {
        title: "Contact",
        links: user.contacts
            .filter(({ kind }) => kind === "email" || kind === "resume")
            .map(({ kind, href }) => ({ label: contactLabels[kind], href })),
    },
    {
        title: "Elsewhere",
        links: user.contacts
            .filter(({ kind }) => kind === "github" || kind === "x" || kind === "linkedin")
            .map(({ kind, href }) => ({ label: contactLabels[kind], href })),
    },
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Assets", href: "/assets" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="mb-8">
            <Block className="aspect-auto">
                <div className="grid w-full grid-cols-1 divide-y divide-edge border-b border-edge md:grid-cols-3 md:divide-x md:divide-y-0">
                    {groups.map(({ title, links }) => (
                        <nav key={title} aria-label={`Footer ${title}`} className="min-w-0 p-6">
                            <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-mute">
                                {title}
                            </h2>
                            <ul>
                                {links.map(({ label, href }) => {
                                    const external = href.startsWith("https://");

                                    return (
                                        <li key={href}>
                                            <a
                                                href={href}
                                                target={external ? "_blank" : undefined}
                                                rel={external ? "noopener noreferrer" : undefined}
                                                className="-mx-2 inline-flex min-h-11 items-center rounded-sm px-2 text-fg transition-colors duration-150 hover:bg-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg motion-reduce:transition-none"
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    ))}
                </div>
                <p className="w-full px-6 py-8 text-center text-[clamp(2.5rem,10vw,6rem)] leading-none font-semibold tracking-tighter text-mute wrap-break-word">
                    {user.name}
                </p>
            </Block>
        </footer>
    );
}
