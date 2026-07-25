import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import EngravedX from "./EngravedX";
import EngravedLinkedIn from "./EngravedLinkedIn";
import EngravedGithub from "./EngravedGithub";

interface SocialsProps {
    endReached: boolean;
    delay?: number;
    className?: string;
}

export default function Socials({ endReached, delay, className }: SocialsProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -8,
            }}
            animate={{
                opacity: endReached ? 1 : 0,
                y: endReached ? 0 : -8,
            }}
            transition={{
                duration: 0.3,
                delay,
            }}
            className={cn(
                "w-170 h-54 rounded-lg border border-primary-light/20 backdrop-blur-xs bg-night/40 ",
                "shadow-[0_-2px_4px_1px_rgba(228,228,228,0.05),0_2px_10px_1px_#000] ",
                "flex flex-col-reverse overflow-hidden",
                className
            )}
        >
            <motion.div
                initial={{
                    y: -16,
                    boxShadow: "0 2px 10px 1px #000",
                    opacity: 0,
                }}
                animate={{
                    y: endReached ? 0 : -16,
                    opacity: endReached ? 1 : 0,
                }}
                transition={{
                    duration: 0.4,
                    delay: delay ? delay + 0.6 : 0.2,
                }}
                className="h-[30%] bg-linear-to-r from-grub to-night/70 flex justify-start items-end px-6 py-3 gap-x-4 "
            >
                <EngravedGithub size={16} />
                <EngravedX size={16} />
                <EngravedLinkedIn size={16} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: endReached ? 1 : 0 }}
                transition={{ delay: delay ? delay + 1.3 : 1.3 }}
                className={cn("h-px w-full bg-linear-to-b from-transparent to-primary-light/10 ")}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: endReached ? 1 : 0 }}
                transition={{ delay: delay ? delay + 1.3 : 1.3 }}
                className={cn("h-px w-full bg-night ")}
            />
            <motion.div
                initial={{
                    y: -16,
                    boxShadow: "0 2px 10px 1px #000",
                    opacity: 0,
                }}
                animate={{
                    y: endReached ? 0 : -16,
                    opacity: endReached ? 1 : 0,
                }}
                transition={{
                    duration: 0.4,
                    delay: delay ? delay + 1.2 : 0.4,
                }}
                className={cn(
                    "absolute top-1/12 left-1/2 -translate-x-1/2 h-38 w-160 ",
                    "bg-linear-to-r from-[#26282e] to-grub rounded-md border border-primary-light/20 ",
                    "shadow-[0_-2px_4px_1px_rgba(228,228,228,0.05),0_2px_10px_0px_#000] ",
                    "flex items-center justify-center gap-14",
                )}
            >
            </motion.div>
        </motion.div>
    )
}