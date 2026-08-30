import { cn } from "@/lib/utils";

export default function Safari({
    url,
    className,
    children,
}: {
    url: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm",
                className,
            )}
        >
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 px-4 py-2.5">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 rounded-md bg-white dark:bg-neutral-900 px-3 py-1 text-center text-xs text-neutral-500 truncate">
                    {url}
                </div>
            </div>
            <div className="bg-white dark:bg-neutral-950">
                {children}
            </div>
        </div>
    );
}
