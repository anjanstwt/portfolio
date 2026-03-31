import { cn } from "@/lib/utils";

export default function SectionHeading({ className, title, extra }: { className?: string; title: string, extra?: string }) {
    return (
        <div className={cn("relative -mx-4 sm:-mx-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] mb-4 mt-2", className)}>
            <div className="relative h-8 w-full border-y border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-10 dark:opacity-20 bg-stripe-pattern"
                    style={{ backgroundSize: '10px 10px' }}
                />
            </div>
            <div className="absolute left-4 sm:left-6 -top-2.5 z-10 bg-neutral-50 dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-[4px] px-3 text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                {title}
            </div>
            {extra && (
                <div className="absolute right-4 sm:right-6 -bottom-2.5 z-10 bg-neutral-50 dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-[4px] px-3 text-xs font-semibold tracking-widest text-neutral-600 dark:text-neutral-400">
                    {extra}
                </div>
            )}
        </div>
    );
}
