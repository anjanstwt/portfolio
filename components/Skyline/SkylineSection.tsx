import { cn } from "@/lib/utils";
import { SkylineSheet } from "./ParticleSkyline";

interface SkylineSectionProps {
    className?: string;
}

// `className` sizes the section; the sheet fills it, keeping its 9:10 aspect
// ratio and centring on whichever axis has room.
export default function SkylineSection({ className }: SkylineSectionProps) {
    return (
        <section
            aria-label="Skyline chart"
            className={cn(
                "relative overflow-hidden",
                className,
            )}
        >
            <SkylineSheet className="absolute inset-0 m-auto h-full max-h-full w-auto max-w-full" />
        </section>
    );
}
