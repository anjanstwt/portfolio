"use client"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ClockProps {
    size?: number;
    className?: string;
}

const BASE_SIZE = 128;

export default function Clock({ size = BASE_SIZE, className }: ClockProps) {

    const scale = size / BASE_SIZE;

    return (
        <div style={{ width: size, height: size }} className={cn("relative", className)}>
            <div
                style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
                className="size-32 border-5 border-white rounded-full flex flex-col justify-center items-center bg-ink "
            >
                <div className="relative size-26 border-5 border-white rounded-full bg-ink ">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 720, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-1/2 h-20 w-140 z-20 "
                    >
                        <div className="h-full w-[57.25%] border-5 border-[#ff4000] ring-5 ring-ink bg-ink rounded-full " />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-1/2 h-20 w-200 "
                    >
                        {/* <div className="absolute left-1/2 top-1/2 -translate-1/2 size-17 bg-white z-40 rounded-full " /> */}
                        <div className="h-full w-[55%] border-5 border-[#ff4000] ring-5 ring-ink bg-ink rounded-full " />
                    </motion.div>
                </div>
            </div>
            <div className="absolute -z-10 w-full text-white">
                <span className="text-[#ff4000] " >Time </span>
                never waits for anyone
                <span className="text-[#ff4000] " >.</span>
            </div>
        </div>
    )
}