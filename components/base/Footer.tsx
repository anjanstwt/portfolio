import ToolTipComponent from "../ui/TooltipComponent";
import { cn } from "@/lib/utils";
import { details } from "../data/details";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn(
            "w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 pt-8 pb-4 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500",
            className,
        )}>
            <div>&copy; {new Date().getFullYear()} Anjan Suman</div>
            <SocialLinks />
        </footer>
    );
}

function SocialLinks() {
    return (
        <div className={cn(
            "flex items-center gap-3 text-neutral-600 dark:text-neutral-300 flex-wrap",
        )}
        >
            {details.map(({ link, label, logo: Icon, tooltip }) => (
                <ToolTipComponent
                    key={label}
                    content={tooltip}
                >
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

