import { cn } from "@/lib/utils";

export default function Safari({
    url,
    className,
    children,
}: {
    url?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950",
                className,
            )}
        >
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 px-3 py-2">
                <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                {url && (
                    <div className="flex-1 truncate rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-center text-xs text-neutral-500 dark:text-neutral-400">
                        {url}
                    </div>
                )}
            </div>
            <div className="p-4">{children}</div>
        </div>
    );
}
