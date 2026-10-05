import type { Metadata } from "next";
import CapsuleStack from "@/components/showcase/capsule-stack/CapsuleStack";
import FloatingDiscs from "@/components/showcase/floating-discs/FloatingDiscs";
import CircleSlash from "@/components/showcase/circle-slash/CircleSlash";

export const metadata: Metadata = {
    title: "Stacks",
    description: "Showcase scratch page.",
};

/** Scratch page: each showcase piece gets a full-viewport frame. */
export default function StacksPage() {
    return (
        <main className="flex flex-col">
            <section id="capsules" className="relative h-screen w-full bg-[radial-gradient(120%_90%_at_50%_20%,#fbfbfb_0%,#f7f7f7_45%,#e9e9e9_100%)]">
                <CapsuleStack />
            </section>
            <section id="discs" className="relative h-screen w-full bg-[#e6e6e6]">
                <FloatingDiscs />
            </section>
            <section id="circle" className="relative h-screen w-full bg-block">
                <CircleSlash />
            </section>
        </main>
    );
}
