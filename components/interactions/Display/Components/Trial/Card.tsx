'use client'
import { cn } from "@/lib/utils";
import { Icon24Hours, Icon3dCubeSphere, IconAccessible, IconAlarm, IconPlus, IconX } from "@tabler/icons-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const elements: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; heading: string; description: string }[] = [
    { icon: Icon24Hours, heading: "24 hours", description: "available 24 hrs just for you" },
    { icon: Icon3dCubeSphere, heading: "3 dimension", description: "3 dimensional rotational help" },
    { icon: IconAccessible, heading: "Accessible", description: "Accessibility from all around the world" },
    { icon: IconAlarm, heading: "Alarm", description: "Always ticks a countdown" },
]

export default function Card() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const parentVariants: Variants = {
        open: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.05,
            },
        },
        close: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0,
            },
        },
    };

    const itemsVariants: Variants = {
        open: { opacity: 1, y: 0 },
        close: { opacity: 0, y: -8 },
    }

    return (
        <div className={cn(
            "w-88 min-h-114 h-114 bg-[#131313] rounded-xl ",
            "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35),0px_8px_16px_0px_rgba(0,0,0,0.25),0px_32px_64px_-8px_rgba(0,0,0,0.35),0px_3px_6px_0px_rgba(0,0,0,0.5)] ",
            "p-6 flex flex-col items-center"
        )}>
            <span className="font-bold text-xs text-neutral-200">
                anjanstwt
            </span>
            <p className="text-[10px] text-neutral-300 ">Hey, Anjan this side, welcoming you'll to see this card</p>
            <div className={cn(
                "flex justify-center items-center gap-x-2 "
            )}>
                <button
                    className={cn(
                        "flex justify-center items-center gap-x-2 px-2 py-1",
                        "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25),0px_1px_2px_0px_rgba(0,0,0,0.4)] ",
                        "rounded-md text-neutral-300 text-xs mt-4 "
                    )}
                >
                    <Image
                        height={20}
                        width={20}
                        src={"/images/profile.jpeg"}
                        alt={"anjanstwt"}
                        className="rounded-xs"
                    />
                    anjanstwt
                </button>
            </div>
            <div className="bg-[#131313] w-full flex-1 mt-4 rounded-lg border border-dashed border-neutral-800 text-neutral-300 relative cursor-pointer ">
                <motion.div
                    variants={parentVariants}
                    animate={isOpen ? "open" : "close"}
                    className="absolute inset-0 bg-[#131313] rounded-lg divide-y divide-neutral-800 border border-neutral-800 flex flex-col "
                    initial={{
                        opacity: 0,
                        filter: "blur(10px)",
                        scale: 0.98,
                    }}
                    whileHover={{
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1.02
                    }}
                    transition={{
                        duration: 0.2
                    }}
                    onHoverStart={() => setIsOpen(true)}
                    onHoverEnd={() => setIsOpen(false)}
                >
                    {elements.map(({ icon: Icon, heading, description }, i) => (
                        <motion.div
                            variants={itemsVariants}
                            key={i}
                            className="flex justify-start items-center gap-x-3 px-4 py-3 "
                        >
                            <div
                                className={cn(
                                    "flex justify-center items-center p-2 rounded-sm",
                                    "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25),0px_1px_2px_0px_rgba(0,0,0,0.4)] ",
                                )}><Icon className="h-5 w-5 text-neutral-300" /></div>
                            <div>
                                <p className="text-sm font-semibold text-neutral-200">{heading}</p>
                                <p className="text-[10px] text-neutral-500">{description}</p>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div
                        variants={itemsVariants}
                        className="flex-1 flex justify-center items-center"
                    >
                        <div className={cn(
                            "flex justify-center items-center px-2 py-1 text-xs rounded-full ",
                            "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.25),0px_1px_2px_0px_rgba(0,0,0,0.4)] ",
                        )}>
                            <div><IconPlus size={12} /></div>
                            <div>Create New</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}