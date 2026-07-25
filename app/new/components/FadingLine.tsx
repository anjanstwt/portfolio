import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FadingLineProps {
    endReached: boolean;
    delay?: number;
}

export default function FadingLine({ endReached, delay }: FadingLineProps) {
    const coreWidth = 1200;
    const coreHeight = 60;

    return (
        <>
            <motion.svg
                className={cn(
                    "absolute left-1/2 w-[130vw] h-3 overflow-visible",
                )}
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
                initial={{ x: "-50%", opacity: 0, scaleX: 0 }}
                animate={{ x: "-50%", opacity: endReached ? 1 : 0, scaleX: endReached ? 1 : 0 }}
                transition={{ opacity: { duration: 0.6 }, scaleX: { duration: 1, ease: "easeOut", delay } }}
            >
                <defs>
                    <linearGradient id="fading-line-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#e4e4e440" stopOpacity="0" />
                        <stop offset="35%" stopColor="#e4e4e4" stopOpacity="1" />
                        <stop offset="65%" stopColor="#e4e4e4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#e4e4e420" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,20 Q500,0 1000,20 Q500,40 0,20 Z"
                    fill="url(#fading-line-gradient)"
                    className={cn(
                        "drop-shadow-[0_0_20px_rgba(228,228,228,0.8)]",
                        "blur-[3px]"
                    )}
                />
            </motion.svg>
            <motion.svg
                className="absolute left-1/2 top-1/2 overflow-visible"
                width={coreWidth}
                height={coreHeight}
                viewBox={`0 0 ${coreWidth} ${coreHeight}`}
                preserveAspectRatio="none"
                initial={{ x: "-50%", y: "-50%", opacity: 0, scaleX: 0 }}
                animate={{ x: "-50%", y: "-50%", opacity: endReached ? 1 : 0, scaleX: endReached ? 1 : 0 }}
                transition={{ opacity: { duration: 0.6 }, scaleX: { duration: 1, ease: "easeOut", delay } }}
            >
                <path
                    d={`M0,${coreHeight / 2} Q${coreWidth / 2},0 ${coreWidth},${coreHeight / 2} Q${coreWidth / 2},${coreHeight} 0,${coreHeight / 2} Z`}
                    fill="url(#fading-line-gradient)"
                    className={cn(
                        "drop-shadow-[0_0_20px_rgba(228,228,228,0.8)]",
                        "blur-[3px]"
                    )}
                />
            </motion.svg>
        </>
    )
}