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
                "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4",
                className,
            )}
        >
            {children}
        </div>
    );
}
