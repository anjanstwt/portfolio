import { FiArrowUpRight } from "react-icons/fi";
import Block from "@/components/home/block/Block";
import user from "@/data/user.data";

export default function Footer() {
    return (
        <footer aria-label="Site footer">
            <Block className="aspect-auto">
                <div className="w-full px-5 pt-6 pb-5 md:px-8 md:pt-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <p>Thanks for stopping by.</p>
                        <p>Made with care, one block at a time.</p>
                    </div>
                    <p className="mt-6 mb-8 text-[clamp(2rem,9vw,5rem)] leading-none font-black tracking-tighter text-fg uppercase">
                        {user.name}
                    </p>
                    <nav aria-label="Footer links" className="grid grid-cols-2 gap-2 md:grid-cols-5">
                        {user.contacts.map((contact) => (
                            <a
                                key={contact.kind}
                                href={contact.href}
                                target={contact.kind === "email" ? undefined : "_blank"}
                                rel={contact.kind === "email" ? undefined : "noopener noreferrer"}
                                className="flex items-center justify-between gap-2 rounded-xl border border-edge px-3.5 py-3 capitalize transition-colors duration-200 hover:bg-page hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg motion-reduce:transition-none"
                            >
                                {contact.label}
                                <FiArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                            </a>
                        ))}
                    </nav>
                    <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-edge pt-4 text-xs">
                        <p>© {user.name}</p>
                        <p>See you around the internet.</p>
                    </div>
                </div>
            </Block>
        </footer>
    );
}
