import { FiArrowUpRight } from "react-icons/fi";
import Block from "@/components/home/block/Block";
import user from "@/data/user.data";

const linkClassName =
    "inline-flex w-fit items-center gap-1.5 rounded-sm text-fg transition-colors duration-200 hover:text-mute focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-reduce:transition-none";

export default function Footer() {
    const email = user.contacts.find((contact) => contact.kind === "email");
    const socials = user.contacts.filter((contact) =>
        ["github", "x", "linkedin"].includes(contact.kind),
    );

    return (
        <footer aria-label="Site footer" className="mt-4">
            <Block className="aspect-auto items-stretch">
                <div className="px-5 py-8 sm:px-8 sm:py-10">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                        Until next time
                    </p>
                    <h2 className="text-2xl font-medium tracking-tight text-fg sm:text-4xl">
                        Thanks for stopping by.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-mute">
                        Have something in mind?{" "}
                        {email && (
                            <a href={email.href} className={linkClassName}>
                                Let&apos;s talk
                                <FiArrowUpRight aria-hidden="true" />
                            </a>
                        )}
                    </p>
                </div>

                <div className="grid grid-cols-1 divide-y divide-edge border-y border-edge sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <div className="px-5 py-5 sm:px-8">
                        <p className="mb-3 text-xs text-mute">Crafted by</p>
                        <p className="text-sm font-medium text-fg">{user.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-mute">
                            A little corner of the internet.
                        </p>
                    </div>

                    <nav aria-label="Footer social links" className="px-5 py-5 sm:px-8">
                        <p className="mb-3 text-xs text-mute">Elsewhere</p>
                        <ul className="flex flex-col gap-2 text-xs">
                            {socials.map((contact) => (
                                <li key={contact.kind}>
                                    <a
                                        href={contact.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={linkClassName}
                                    >
                                        {contact.kind === "github"
                                            ? "GitHub"
                                            : contact.kind === "linkedin"
                                              ? "LinkedIn"
                                              : "X / Twitter"}
                                        <FiArrowUpRight aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="px-5 py-5 sm:px-8">
                        <p className="mb-3 text-xs text-mute">Built with</p>
                        <ul className="space-y-2 text-xs text-fg">
                            <li>Next.js</li>
                            <li>React</li>
                            <li>Tailwind CSS</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-[10px] leading-relaxed text-mute sm:px-8 sm:text-xs">
                    <p>&copy; {new Date().getFullYear()} {user.name}</p>
                    <p>Always a work in progress.</p>
                </div>
            </Block>
        </footer>
    );
}
