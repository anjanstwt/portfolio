import { cn } from "@/lib/utils";
import { details } from "@/components/data/details";
import Block from "./Block";
import Safari from "./Safari";

const SITE_URL = "https://anjan.site";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn("w-full", className)}>
            <Safari url={SITE_URL}>
                {/* The negative offsets hide the trailing borders of the last
                    row and column so the grid meets the frame cleanly. */}
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 -mr-px -mb-px">
                        {details.map(({ label, link, tooltip }) => (
                            <Block
                                key={label}
                                label={label}
                                value={tooltip}
                                href={link}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 text-[11px] text-primary-light/40">
                    <span>&copy; {new Date().getFullYear()} Anjan Suman</span>
                    <span className="tracking-[0.2em]">BUILT WITH NEXT.JS</span>
                </div>
            </Safari>
        </footer>
    );
}
