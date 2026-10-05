import { cn } from "@/lib/utils";

interface MarginNoteProps {
    label: string;
    className?: string;
}
export default function MarginNote({ label, className }: MarginNoteProps) {
    return (
        <div
            aria-hidden
            className={cn(
                "pointer-events-none max-[1199px]:hidden absolute left-full ml-3 flex items-center gap-3 text-mute",
                className,
            )}
        >
            <svg
                viewBox="0 0 24 100"
                preserveAspectRatio="none"
                className="h-[96%] w-6 overflow-visible"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    vectorEffect="non-scaling-stroke"
                    d="M1.4 -1 C 5.5 -0.75, 9.5 -0.35, 13.5 0.4 C 16.5 0.95, 18.7 1.7, 18.7 3.4 C 18.7 12, 16.4 22, 17.8 33 C 19.3 44, 21.6 54, 19.4 65 C 17.6 75, 20.4 86, 18.6 96.4 C 18.6 98.2, 16.4 99.1, 13.6 99.5 C 9.5 100.2, 5.5 100.65, 1.4 100.9"
                />
            </svg>
            <span className="font-handwriting text-xl leading-none whitespace-nowrap -rotate-6 origin-left translate-y-1">
                {label}
            </span>
        </div>
    );
}
