import Image from "next/image";
import ToolTipComponent from "../ui/TooltipComponent";
import BlueTick from "../ui/BlueTick";
import { cn } from "@/lib/utils";

export default function Title({ className }: { className?: string }) {
    return (
        <section className={cn("w-full flex items-center justify-between pt-8", className)}>
            <div className="flex flex-col gap-2">
                <div className="text-white text-3xl font-semibold flex items-center gap-x-2 tracking-tight">
                    <h1>Anjan Suman</h1>
                    <div className="flex items-center text-blue-400">
                        <BlueTick size={20} />
                    </div>
                </div>
                <Contacts />
            </div>
            <Image
                src={'/images/profile.jpeg'}
                alt={'Profile'}
                width={80}
                height={80}
                className="rounded shadow-lg border border-neutral-800 object-cover"
            />
        </section>
    );
}

function Contacts() {
    const data = [
        { link: 'https://x.com/anjanstwt', title: 'X', tooltip: 'anjanstwt' },
        { link: 'https://github.com/anjanstwt', title: 'GitHub', tooltip: 'anjanstwt' },
        { link: 'https://linkedin.com/in/anjanstwt', title: 'LinkedIn', tooltip: 'anjanstwt' },
        { link: 'mailto:anjansuman80@gmail.com', title: 'Email', tooltip: 'anjansuman80@gmail.com' }
    ];

    return (
        <div className="text-sm font-medium text-neutral-400 flex gap-x-4 mt-1">
            {data.map((entry, i) => (
                <ToolTipComponent content={entry.tooltip} key={i}>
                    <a
                        target="_blank"
                        href={entry.link}
                        className="cursor-pointer hover:text-neutral-100 transition-colors"
                    >
                        {entry.title}
                    </a>
                </ToolTipComponent>
            ))}
        </div>
    );
}