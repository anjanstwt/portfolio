import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import user from "@/data/user.data";

export default function Footer() {
    const year = new Date().getFullYear();

    const cells = [
        {
            label: "Email",
            value: "anjansuman80@gmail.com",
            href: "mailto:anjansuman80@gmail.com",
        },
        {
            label: "GitHub",
            value: "@anjanstwt",
            href: "https://github.com/anjanstwt",
        },
        {
            label: "LinkedIn",
            value: "@anjanstwt",
            href: "https://linkedin.com/in/anjanstwt",
        },
        {
            label: "X / Twitter",
            value: "@anjanstwt",
            href: "https://x.com/anjanstwt",
        },
    ];

    return (
        <footer className="w-full mt-4">
            <div className="rounded-3xl max-[480px]:rounded-xl border-t-[0.5px] border-t-edge bg-block shadow-[0_0_0_1px_var(--t-ring),0_1px_2px_0_var(--t-shadow)] overflow-hidden">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                    <span className="text-fg font-medium text-sm">anjansuman.com</span>
                    <span className="text-mute text-xs">Engineer by trade, builder by obsession.</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 border-t-[0.5px] border-t-edge">
                    {cells.map((cell, i) => (
                        <div
                            key={cell.label}
                            className={[
                                "bg-block px-4 py-3 flex min-w-0 flex-col gap-1",
                                i === 1 && "border-l-[0.5px] border-l-edge",
                                i === 2 && "border-t-[0.5px] border-t-edge md:border-t-0 md:border-l-[0.5px] md:border-l-edge",
                                i === 3 && "border-t-[0.5px] border-t-edge border-l-[0.5px] border-l-edge md:border-t-0",
                            ].filter(Boolean).join(" ")}
                        >
                            <dt className="text-[0.625rem] leading-4 font-medium tracking-wider text-mute uppercase">{cell.label}</dt>
                            <dd className="text-sm text-fg">
                                <a
                                    href={cell.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-mute transition-colors"
                                >
                                    {cell.value}
                                </a>
                            </dd>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 px-4 py-3 border-t-[0.5px] border-t-edge">
                    <a
                        href="mailto:anjansuman80@gmail.com"
                        aria-label="Email"
                        className="text-mute hover:text-fg transition-colors"
                    >
                        <FiMail className="size-4" />
                    </a>
                    <a
                        href="https://x.com/anjanstwt"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X Profile"
                        className="text-mute hover:text-fg transition-colors"
                    >
                        <RiTwitterXLine className="size-4" />
                    </a>
                    <a
                        href="https://github.com/anjanstwt"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="text-mute hover:text-fg transition-colors"
                    >
                        <FaGithub className="size-4" />
                    </a>
                    <a
                        href="https://linkedin.com/in/anjanstwt"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="text-mute hover:text-fg transition-colors"
                    >
                        <FaLinkedinIn className="size-4" />
                    </a>
                    <span className="ml-auto text-mute text-xs">
                        &copy; {year} Anjan Suman
                    </span>
                </div>
            </div>
        </footer>
    );
}
