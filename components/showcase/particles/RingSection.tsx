import { cn } from "@/lib/utils";
import ParticleRing from "./ParticleRing";

interface RingSectionProps {
    className?: string;
}

// `className` sizes the section; the ring fills it, square, centred on
// whichever axis has room. Transparent apart from the white particles.
export default function RingSection({ className }: RingSectionProps) {
    return (
        <section aria-label="Particle ring" className={cn("relative overflow-hidden", className)}>
            <ParticleRing className="absolute inset-0 m-auto h-full max-h-full w-auto max-w-full" />
        </section>
    );
}
