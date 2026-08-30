import ToolTipComponent from "@/components/ui/TooltipComponent";
import { details } from "@/components/data/details";
import { cn } from "@/lib/utils";
import Block from "./Block";
import Safari from "./Safari";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn("w-full", className)}>
            <Block className="flex flex-col gap-6">
                <Safari url="anjan.dev">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 p-6 text-sm text-neutral-500">
                        <div>&copy; {new Date().getFullYear()} Anjan Suman</div>
                        <SocialLinks />
                    </div>
                </Safari>
            </Block>
        </footer>
    );
}

function SocialLinks() {
    return (
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 flex-wrap">
            {details.map(({ link, label, logo: Icon, tooltip }) => (
                <ToolTipComponent key={label} content={tooltip}>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                    >
                        <Icon size={16} />
                    </a>
                </ToolTipComponent>
            ))}
        </div>
    );
}
