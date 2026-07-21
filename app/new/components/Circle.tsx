'use client';
import { useState } from "react";
import { Variants, motion } from "framer-motion"
import { cn } from "@/lib/utils";
import FadingLine from "./FadingLine";
import Socials from "./Socials";


export default function Circle() {

    const [phase, setPhase] = useState<"start" | "mid" | "end">("mid");
    const [arcActive, setArcActive] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const delay = 0.8;

    const circleVariants: Variants = {
        start: {
            top: '35%',
            left: '40%',
            height: 1000,
            width: 1000,
            aspectRatio: 1 / 1,
            opacity: 0,
        },
        mid: {
            top: "67%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            opacity: 1,
            transition: {
                duration: 1.2,
                opacity: { duration: 0.7 },
            },
        },
        end: {
            height: 1200,
            width: 1200,
            top: "65%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            opacity: 1,
            boxShadow: "0 0 55px 30px rgba(240,220,170,0.1)",
            transition: {
                duration: 0.8,
                boxShadow: {
                    duration: 1.5,
                    delay: 0.8
                },
                staggerChildren: 0.08,
                delayChildren: 0.05,
            },
        },
    }

    const childrenVariants: Variants = {
        mid: { opacity: 0, y: -8 },
        end: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            variants={circleVariants}
            initial={"start"}
            animate={phase}
            onAnimationComplete={(definition) => {
                if (definition === "mid") {
                    setArcActive(true);
                    setTimeout(() => setPhase("end"), 1000);
                } else if (definition === "end") {
                    setEndReached(true);
                }
            }}
            className={cn(
                "absolute top-[35%] left-[55%] h-210 w-210 rounded-full shrink-0 aspect-square bg-night ",
            )}
        >
            <motion.div
                className="absolute inset-[0%] rounded-full"
                style={{
                    WebkitMaskImage: "radial-gradient(circle farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
                    maskImage: "radial-gradient(circle farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
                }}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: arcActive ? 1 : 0, rotate: arcActive ? 360 : 0 }}
                transition={{
                    opacity: { duration: 0.7 },
                    rotate: { repeat: arcActive ? Infinity : 0, ease: "linear", duration: 2 },
                }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "conic-gradient(from 0deg, transparent 0%, #e4e4e4 50%, transparent 100%)" }}
                    animate={{ opacity: endReached ? 0 : 1 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.div
                    className="absolute -inset-50 rounded-full"
                    style={{ background: "#e4e4e480" }}
                    animate={{ opacity: endReached ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                />
            </motion.div>
            <motion.div
                className="h-full w-full flex justify-center items-center"
            >
                <Socials
                    endReached={endReached}
                    delay={delay}
                    className="relative z-10 "
                />
                <FadingLine endReached={endReached} delay={delay * 2} />
            </motion.div>
        </motion.div>
    )
}