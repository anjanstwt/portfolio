import { cn } from "@/lib/utils";

export default function SectionHeading({ className, title, extra }: { className?: string; title: string, extra?: string }) {
    return (
        <div className={cn("relative -mx-6 w-[calc(100%+3rem)] mb-4 mt-2", className)}>
            <div className="relative h-8 w-full border-y border-neutral-800 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(315deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
                        backgroundSize: '10px 10px'
                    }}
                />
            </div>
            <div className="absolute left-6 -top-2.5 z-10 bg-[#09090b] border border-white/20 rounded-[4px] px-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                {title}
            </div>
            {extra && (
                <div className="absolute right-6 -bottom-2.5 z-10 bg-[#09090b] border border-white/20 rounded-[4px] px-3 text-xs font-semibold tracking-widest text-neutral-400">
                    {extra}
                </div>
            )}
        </div>
    );
}
