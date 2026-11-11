import { FiArrowUpRight } from "react-icons/fi";
import user from "@/data/user.data";
import Block from "./block/Block";

const linkClassName =
    "inline-flex min-h-8 items-center gap-1 rounded-sm text-mute transition-colors duration-200 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-reduce:transition-none";

const labelClassName = "mb-3 text-xs uppercase tracking-widest text-mute";

export default function Footer() {
    return (
        <footer className="mt-8" aria-label="Site footer">
            <Block className="aspect-auto" left="Thanks for stopping by.">
                <div className="grid w-full grid-cols-2 gap-px border-y border-edge bg-edge md:grid-cols-4">
                    <div className="min-w-0 bg-block px-3.5 py-5">
                        <h2 className={labelClassName}>Crafted by</h2>
                        <p className="font-medium text-fg">{user.name}</p>
                        <p className="mt-2 text-xs leading-relaxed text-mute">
                            A small corner of the internet, made with care.
                        </p>
                    </div>
                    <nav className="min-w-0 bg-block px-3.5 py-5" aria-label="Footer navigation">
                        <h2 className={labelClassName}>Explore</h2>
                        <ul>
                            <li><a className={linkClassName} href="/">Home</a></li>
                            <li><a className={linkClassName} href="/assets">Assets</a></li>
                            <li><a className={linkClassName} href="/stacks">Stacks</a></li>
                        </ul>
                    </nav>
                    <nav className="min-w-0 bg-block px-3.5 py-5" aria-label="Footer contact links">
                        <h2 className={labelClassName}>Connect</h2>
                        <ul>
                            {user.contacts.map((contact) => (
                                <li key={contact.kind}>
                                    <a
                                        className={`${linkClassName} capitalize`}
                                        href={contact.href}
                                        target={contact.kind === "email" ? undefined : "_blank"}
                                        rel={contact.kind === "email" ? undefined : "noopener noreferrer"}
                                    >
                                        {contact.label}
                                        <FiArrowUpRight className="size-3" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="min-w-0 bg-block px-3.5 py-5">
                        <h2 className={labelClassName}>Built with</h2>
                        <ul className="space-y-2 text-mute">
                            <li>Next.js &amp; React</li>
                            <li>Tailwind CSS</li>
                        </ul>
                        <p className="mt-4 text-xs text-mute">Footer inspired by</p>
                        <a
                            className={linkClassName}
                            href="https://chanhdai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            chanhdai.com
                            <FiArrowUpRight className="size-3" aria-hidden="true" />
                        </a>
                    </div>
                </div>
                <div className="@container w-full overflow-hidden px-3.5 py-6" aria-hidden="true">
                    <p className="text-center text-[11cqw] leading-none font-semibold tracking-tighter text-fg/10 uppercase">
                        {user.name}
                    </p>
                </div>
                <div className="w-full border-t border-edge px-3.5 py-3 text-xs text-mute">
                    &copy; {new Date().getFullYear()} {user.name}
                </div>
            </Block>
        </footer>
    );
}
