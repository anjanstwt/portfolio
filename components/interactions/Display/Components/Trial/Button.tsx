'use client'

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Button() {
    return (
        <div
            className={cn(
                "h-full w-full flex justify-center items-center overflow-hidden ",
                "perspective-[1000px] transform-3d ",
            )}
            style={{
                background: 'radial-gradient(circle at 0.5px 0.5px, rgba(212, 212, 212, 0.2) 0.5px, transparent 0)',
                backgroundSize: "40px 40px"
            }}
        >
            <motion.button
                whileHover={{
                    rotateX: 20,
                    rotateY: 12,
                    boxShadow: "0px 20px 50px rgba(212, 212, 212, 0.05)",
                    y: -6
                }}
                whileTap={{
                    y: 5,
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                }}
                style={{
                    translateZ: 10,
                }}
                className={cn(
                    "relative group cursor-pointer ",
                    "bg-black text-neutral-300 px-10 py-4 rounded-xl ",
                    "shadow-[0px_1px_2px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset] "
                )}
            >
                <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-400 ">
                    Hello There
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-r from-transparent via-neutral-200 to-transparent h-px w-3/4 mx-auto "></span>
                <span className={cn(
                    "absolute inset-x-0 bottom-0 bg-linear-to-r from-transparent via-neutral-200 to-transparent h-1 w-full mx-auto blur-sm ",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
                )}></span>
            </motion.button>
        </div>
    )
}