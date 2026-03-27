import { cn } from "@/lib/utils";

export default function ThickSeparator({ className }: { className?: string }) {
    return (
        <div 
            className={cn(
                "relative flex h-8 -mx-6 w-[calc(100%+3rem)] border-y border-neutral-800 overflow-hidden",
                className
            )}
        >
            <div 
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'repeating-linear-gradient(315deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
                    backgroundSize: '10px 10px'
                }}
            />
        </div>
    );
}
