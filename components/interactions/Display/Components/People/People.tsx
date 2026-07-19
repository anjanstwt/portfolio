'use client'

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { TbSettings } from "react-icons/tb";
import Profile from "./Profile";


export default function People() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeProfile, setActiveProfile] = useState<number | null>(null);

    const capsuleVariants: Variants = {
        close: { height: 34, width: 90, borderRadius: 20, position: "relative" },
        open: { height: 75, width: 290, borderRadius: 20 },
    }

    const settingsVariants: Variants = {
        appear: { y: 0, opacity: 1 },
        disappear: { y: 40, opacity: 0 },
    }

    const profileVariants: Variants = {
        appear: { y: 40, opacity: 0 },
        disappear: { y: 0, opacity: 1 },
    }

    return (
        <motion.div
            variants={capsuleVariants}
            initial="close"
            onClick={() => setIsOpen((prev) => !prev)}
            animate={isOpen ? "open" : "close"}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
                "bg-white flex justify-center items-center overflow-hidden gap-x-5 cursor-pointer "
            )}
        >
            <motion.div
                variants={settingsVariants}
                initial="appear"
                animate={isOpen ? "disappear" : "appear"}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute"
            >
                <TbSettings size={20} />
            </motion.div>

            {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                    key={i}
                    variants={profileVariants}
                    initial="disappear"
                    animate={isOpen ? "disappear" : "appear"}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-11 h-11 shrink-0"
                >
                    <Profile
                        isOpen={activeProfile === i}
                        onClick={() => setActiveProfile((prev) => (prev === i ? null : i))}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}