'use client';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Block from "../../ui/Block";
import { CardTrack, useSideScrollTrack } from "../SideScroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import user from "../../data/user.data";

const SETTLE_VH = 100; // scroll distance for the hero text/image to settle near the top
const TRACK_VH = 250; // scroll distance for the side-scroll card animation
const TOTAL_VH = SETTLE_VH + TRACK_VH;
const HERO_LIFT_VH = 30; // how far up (in vh) the hero content travels while settling

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });

    const settleFraction = SETTLE_VH / TOTAL_VH;

    const settleProgress = useTransform(scrollYProgress, [0, settleFraction], [0, 1], { clamp: true });
    const heroY = useTransform(settleProgress, (v) => `${-v * HERO_LIFT_VH}vh`);
    const trackY = useTransform(settleProgress, [0, 1], ["20vh", "0vh"]);
    const trackOpacity = useTransform(settleProgress, [0, 1], [0, 1]);

    const trackProgress = useTransform(scrollYProgress, [settleFraction, 1], [0, 1], { clamp: true });
    const { x, viewportWidth, rotateSignal, speedFactor } = useSideScrollTrack(trackProgress);

    return (
        <section ref={sectionRef} className="relative" style={{ height: `${TOTAL_VH}vh` }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div style={{ y: heroY }} className="relative">
                        <div className={cn(
                            "text-[160px] font-semibold bg-linear-to-b from-primary-light/20 to-transparent bg-clip-text text-transparent text-shadow-xs ",
                        )}>
                            {user.name}
                        </div>
                        <Block className="absolute left-1/2 -translate-x-1/2 top-40 h-40 w-40 p-1 rounded-xl overflow-hidden drop-shadow-2xl " >
                            <div className="relative h-full w-full">
                                <Image
                                    src={user.image}
                                    alt={"profile"}
                                    fill
                                    className="object-cover rounded-lg "
                                />
                            </div>
                        </Block>
                    </motion.div>
                </div>

                <div className="perspective-[1000px] transform-3d absolute inset-x-0 bottom-0 h-[45vh] flex items-center justify-center">
                    <motion.div style={{ y: trackY, opacity: trackOpacity }} className="transform-3d w-full h-full flex items-center">
                        <CardTrack x={x} viewportWidth={viewportWidth} rotateSignal={rotateSignal} speedFactor={speedFactor} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
