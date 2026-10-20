import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import { PiLampPendantFill } from "react-icons/pi";
import Block from "@/components/home/block/Block";
import { satisfy } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const PAGES = [
    { label: "Assets", href: "/assets" },
    { label: "Stacks", href: "/stacks" },
];

const SOCIALS = [
    { label: "Twitter / X", href: "https://x.com/anjanstwt" },
    { label: "LinkedIn", href: "https://linkedin.com/in/anjanstwt" },
    { label: "GitHub", href: "https://github.com/anjanstwt" },
];

const ROW_LINK =
    "group/link flex items-center justify-between w-full py-1 text-mute hover:text-fg transition-colors duration-200";

export default function FooterGrid() {
    return (
        <footer className="@container grid grid-cols-4 max-md:grid-cols-2 gap-4">
            <Block
                left={
                    <PiLampPendantFill className="size-4.5 p-0.75 bg-fg text-page rounded-[3px]" />
                }
                className="col-span-2 w-full aspect-auto h-[calc(25cqw-0.75rem)] max-md:h-[calc(50cqw-0.5rem)]"
            >
                <div className="px-3.5 pb-3 w-full">
                    <div
                        className={cn(
                            "text-fg text-[40px] leading-none min-[480px]:max-md:text-[64px]",
                            satisfy.className,
                        )}
                    >
                        Darwin
                    </div>
                    <div className="mt-2 text-xs min-[480px]:max-md:text-base">
                        Pune, India
                    </div>
                </div>
            </Block>

            <Block left={<span className="text-mute text-xs">Pages</span>}>
                <nav className="px-3.5 pb-3 w-full flex flex-col text-fg">
                    {PAGES.map(({ label, href }) => (
                        <a key={href} href={href} className={ROW_LINK}>
                            <span className="group-hover/link:text-fg">{label}</span>
                            <FiArrowUpRight className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                        </a>
                    ))}
                </nav>
            </Block>

            <Block left={<span className="text-mute text-xs">Connect</span>}>
                <nav className="px-3.5 pb-3 w-full flex flex-col text-fg">
                    {SOCIALS.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ROW_LINK}
                        >
                            <span className="group-hover/link:text-fg">{label}</span>
                            <FiArrowUpRight className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                        </a>
                    ))}
                </nav>
            </Block>

            <Block
                className="col-span-full w-full aspect-auto h-14 max-[480px]:h-12 flex-row items-center justify-between px-3.5"
            >
                <span className="flex items-center gap-2 text-xs min-[480px]:max-md:text-base">
                    <span className="text-fg">
                        &copy; {new Date().getFullYear()} Anjan
                    </span>
                    <span className="max-[480px]:hidden">All rights reserved</span>
                </span>
                <a
                    href="#"
                    className="flex items-center gap-1.5 text-xs min-[480px]:max-md:text-base text-mute hover:text-fg transition-colors duration-200"
                >
                    Back to top
                    <FiArrowUp />
                </a>
            </Block>
        </footer>
    );
}
