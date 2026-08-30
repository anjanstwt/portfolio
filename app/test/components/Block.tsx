import { cn } from "@/lib/utils";

interface BlockProps {
    children: React.ReactNode;
    className?: string;
}

export default function Block({ children, className }: BlockProps) {
    return (
        <div
            className={cn(
                "w-full rounded-lg border border-[#1c1c1e] bg-night/40 p-6",
                className
            )}
        >
            {children}
        </div>
    );
}
