import { cn } from "@/lib/utils";
import { details } from "../data/details";
import SectionHeading from "../ui/SectionHeading";

export default function Contacts({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex flex-col gap-4", className)}>
            <SectionHeading title="Contact" extra="get in touch" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {details.map(({ type, link, label, logo: Icon, tooltip }) => (
                    <a
                        key={type}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                        <div className="flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 p-2.5 transition-colors">
                            <Icon className="size-4 text-neutral-600 dark:text-neutral-300" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                {label}
                            </span>
                            <span className="text-xs text-neutral-500 truncate">
                                {tooltip}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
