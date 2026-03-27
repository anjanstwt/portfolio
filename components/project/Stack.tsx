import { cn } from "@/lib/utils";


export default function Stacks({ stacks }: { stacks: string[] }) {
    return (
        <div className="mt-2 flex flex-wrap gap-2">
            {stacks.map((s) => (
                <Stack key={s} tech={s} />
            ))}
        </div>
    );    
}

function Stack({ tech }: { tech: string }) {
    return (
        <div className={cn(
            "w-fit px-2 py-1 rounded bg-[#101010] border border-neutral-700 text-neutral-200 text-xs",
            "cursor-pointer",
        )}>
            {tech}
        </div>
    );
}