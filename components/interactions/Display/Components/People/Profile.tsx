"use client"
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface ProfileProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function Profile({ isOpen, onClick }: ProfileProps) {

    const ProfileVariants: Variants = {
        open: { width: 290, height: 310, borderRadius: 20, position: "absolute", top: 0, left: 0, zIndex: 10 },
        close: { width: 44, height: 44, borderRadius: "100%", position: "relative" },
    }

    return (
        <motion.div
            variants={ProfileVariants}
            initial={"close"}
            animate={isOpen ? "open" : "close"}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="overflow-hidden cursor-pointer "
        >
            <Image
                src={"/images/profile.jpeg"}
                alt={"profile"}
                fill
                className="object-fill"
            />
        </motion.div>
    )
}