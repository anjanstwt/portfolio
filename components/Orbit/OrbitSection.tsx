import Orbit from "./Orbit";

/**
 * OrbitSection — full-screen section for the orbital diagram.
 * Dark background with a faint lift in the middle, heavy film grain on top.
 */
export default function OrbitSection({ className = "" }: { className?: string }) {
    return (
        <section
            className={`relative w-full h-screen overflow-hidden ${className}`}
            aria-label="Orbital diagram"
            style={{
                background:
                    "radial-gradient(70% 70% at 50% 45%, #161617 0%, #0f0f10 60%, #0a0a0a 100%)",
            }}
        >
            {/* the diagram, always fully visible, centred */}
            <Orbit className="absolute inset-0 w-full h-full" />

            {/* film grain over the whole section */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <filter id="ob-section-grain" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.6" />
                    </feComponentTransfer>
                </filter>
                <rect width="100%" height="100%" filter="url(#ob-section-grain)" opacity="0.55" style={{ mixBlendMode: "overlay" }} />
            </svg>
        </section>
    );
}
