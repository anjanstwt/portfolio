import { cn } from "@/lib/utils";

interface SafariProps {
    url?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function Safari({ url = "anjansuman.dev", className, children }: SafariProps) {
    return (
        <div
            className={cn(
                "w-full overflow-hidden rounded-xl border border-[#1c1c1e] bg-night shadow-lg",
                className
            )}
        >
            <div className="flex items-center gap-2 border-b border-[#1c1c1e] bg-grub px-4 py-2.5">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex w-2/3 max-w-xs items-center justify-center rounded-md bg-stale px-3 py-1 text-xs text-neutral-400">
                    {url}
                </div>
            </div>
            <div className="bg-stale p-4">
                {children}
            </div>
        </div>
    );
}
