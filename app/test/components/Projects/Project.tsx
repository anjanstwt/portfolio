import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProjectType } from "../../types/project.type";
import Link from "next/link";
import SVG from "../../ui/icons/Arrow";
import Frame from "./Frame";

export default function Project({
    name,
    summary,
    color,
    logo,
    isActive,
    onRef,
}: ProjectType & { isActive: boolean; onRef: (el: HTMLDivElement | null) => void }) {

    const projectRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: projectRef,
        offset: ["start end", "end start"],
    });

    const headingOpacityContent = useTransform(
        scrollYProgress,
        [0.35, 0.40, 0.60, 0.65],
        [0, 1, 1, 0]
    );

    const headingSizeContent = useTransform(
        scrollYProgress,
        [0.35, 0.47, 0.53, 0.65],
        [0.75, 1, 1, 0.75]
    );

    const summaryOpacityContent = useTransform(
        scrollYProgress,
        [0.45, 0.55, 0.60, 0.65],
        [0, 1, 1, 0]
    );

    const summarySizeContent = useTransform(
        scrollYProgress,
        [0.45, 0.47],
        [0.75, 1]
    );

    const hoverEnabled = useTransform(
        scrollYProgress,
        [0.44, 0.4401, 0.65, 0.6501],
        ["none", "auto", "auto", "none"]
    );

    const [hovered, setHovered] = useState(false);
    const [charged, setCharged] = useState(false);

    useEffect(() => {
        if (!hovered) {
            setCharged(false);
            return;
        }

        const timer = setTimeout(() => {
            setCharged(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [hovered]);

    return (
        <Link href={`/${name.toLowerCase()}`}>
            <motion.div
                ref={(el) => {
                    projectRef.current = el;
                    onRef(el);
                }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                className={cn(
                    "group block relative text-center py-10 px-10",
                    "bg-transparent transition-colors duration-500 ease-in-out",
                    "select-none cursor-pointer "
                )}
                style={{ pointerEvents: isActive ? hoverEnabled : "none" }}
            >
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-px overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to left, white, rgba(255,255,255,.4) 30%, transparent)",
                        }}
                        animate={{ opacity: charged ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to left, ${color}, ${color}66 30%, transparent)`,
                        }}
                        animate={{ opacity: charged ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                </div>

                {/* Right Border */}
                <div className="absolute top-0 right-0 bottom-0 w-px overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, white, rgba(255,255,255,.4) 30%, transparent)",
                        }}
                        animate={{ opacity: charged ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom, ${color}, ${color}66 30%, transparent)`,
                        }}
                        animate={{ opacity: charged ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                </div>

                {/* Arrow */}
                <div className="pointer-events-none absolute top-[0.75px] right-[0.75px] translate-x-1/2 -translate-y-1/2 p-0.5 bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="relative h-3 w-3">
                        <motion.div
                            className="absolute inset-0"
                            animate={{ opacity: charged ? 0 : 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <MdOutlineArrowOutward className="h-3 w-3 text-white" />
                        </motion.div>

                        <motion.div
                            className="absolute inset-0"
                            animate={{ opacity: charged ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <MdOutlineArrowOutward
                                className="h-3 w-3"
                                style={{ color }}
                            />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="text-white text-9xl font-black"
                    style={{
                        opacity: headingOpacityContent,
                        scale: headingSizeContent,
                    }}
                >
                    {name}
                </motion.div>
                <motion.div
                    className="text-white/70 text-lg"
                    style={{
                        opacity: summaryOpacityContent,
                        scale: summarySizeContent,
                    }}
                >
                    {summary}
                </motion.div>
                <SVG
                    className={cn(
                        "absolute z-10 -top-17 -left-10 -rotate-z-10 ",
                        "transform -scale-x-100 ",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in delay-300",
                    )}
                    size={140}
                    color={"#ffffff"}
                />
                <SVG
                    className={cn(
                        "absolute z-10 -bottom-18 left-70 -rotate-z-30 ",
                        "transform -scale-y-100 ",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in delay-300",
                    )}
                    size={140}
                    color={"#6c44fc"}
                />
                <SVG
                    className={cn(
                        "absolute z-10 top-4 -right-30 rotate-z-75 ",
                        "transform -scale-y-100 ",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in delay-300",
                    )}
                    size={140}
                    color={"#ff8fab"}
                />
                <Frame
                    className={cn(
                        "absolute z-10 -bottom-54 left-110 ",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in delay-300",
                    )}
                    src={logo}
                    alt={name}
                    size={200}
                />
            </motion.div>
        </Link>
    );
}