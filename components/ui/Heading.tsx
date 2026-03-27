import { cn } from "@/lib/utils";
import { IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";

const ibm = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

interface HeadingProps {
    logo?: string;
    heading: string;
    tag?: string;
    tag2?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
};


export default function Heading({ logo, heading, tag, tag2, size = 'lg', className }: HeadingProps) {
    return (
        <div className="w-full layout-bottom-border layout-padding ">
            <div className={cn(
                `font-semibold text-neutral-200 ${ibm.className} flex justify-between items-baseline `,
                size === 'lg'
                    ? 'text-2xl'
                    : size === 'md'
                        ? 'text-xl'
                        : size === 'sm'
                            ? 'text-lg'
                            : 'text-base',
                className,
            )}
            >
                {logo && (
                    <Image
                        src={logo}
                        alt={heading}
                        height={'25'}
                        width={'25'}
                        className="rounded layout-border p-0.5"
                    />
                )}
                <div className="flex justify-start items-baseline gap-x-1 ">
                    <div>{heading.toUpperCase()}</div>
                    <div className="text-xs text-neutral-400">{tag}</div>
                </div>
                <div className="text-xs text-neutral-400">{tag2}</div>
            </div>
        </div>
    );
}