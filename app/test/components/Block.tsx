import { cn } from "@/lib/utils";

export default function Block({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6",
                className,
            )}
        >
            {children}
        </div>
    );
}
