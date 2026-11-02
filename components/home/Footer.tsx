import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import user from "@/data/user.data";

const linkClassName =
    "inline-flex items-center gap-1 rounded-sm text-fg transition-colors hover:text-mute focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-reduce:transition-none";

export default function Footer() {
    return (
        <footer className="mt-8 overflow-hidden rounded-3xl border border-edge bg-block max-[480px]:rounded-xl">
            <div className="px-5 py-8 sm:px-6">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-mute">
                    Thanks for stopping by
                </p>
                <p className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                    {user.name}<span className="text-mute">.</span>
                </p>
            </div>

            <div className="grid grid-cols-2 border-t border-edge sm:grid-cols-3">
                <div className="border-r border-edge p-5 sm:px-6">
                    <p className="mb-3 text-xs text-mute">Built with</p>
                    <p className="text-fg">Next.js &amp; React</p>
                    <p className="mt-1 text-xs text-mute">Styled with Tailwind CSS</p>
                </div>

                <div className="p-5 sm:border-r sm:border-edge sm:px-6">
                    <p className="mb-3 text-xs text-mute">Elsewhere</p>
                    <nav aria-label="Footer social links" className="flex flex-col items-start gap-2">
                        {user.contacts.filter((contact) => ["github", "x"].includes(contact.kind)).map((contact) => (
                            <a
                                key={contact.kind}
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClassName}
                            >
                                {contact.kind === "github" ? "GitHub" : "Twitter / X"}
                                <FiArrowUpRight aria-hidden="true" className="size-3.5" />
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="col-span-2 border-t border-edge p-5 sm:col-span-1 sm:border-t-0 sm:px-6">
                    <p className="mb-3 text-xs text-mute">Keep exploring</p>
                    <nav aria-label="Footer navigation" className="flex flex-col items-start gap-2">
                        <a href="/assets" className={linkClassName}>Assets</a>
                        <a href={user.contacts.find((contact) => contact.kind === "email")?.href} className={linkClassName}>
                            Get in touch
                            <FiArrowUpRight aria-hidden="true" className="size-3.5" />
                        </a>
                    </nav>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge px-5 py-4 text-xs sm:px-6">
                <p>© {new Date().getFullYear()} {user.name}</p>
                <a href="#top" className={linkClassName}>
                    Back to top
                    <FiArrowUp aria-hidden="true" className="size-3.5" />
                </a>
            </div>
        </footer>
    );
}
