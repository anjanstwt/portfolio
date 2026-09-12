import ParticleTemple from "./ParticleTemple";

// Sits below the footer: the particle temple, nothing else.
export default function TempleSection() {
    return (
        <section className="w-full overflow-hidden px-6 pb-24 pt-8 md:pb-32">
            <ParticleTemple className="mx-auto w-[min(88vw,880px)] aspect-[1215/1390]" />
        </section>
    );
}
