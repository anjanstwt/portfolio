import { motion, Transition } from "framer-motion";
import Block from "../ui/Block";
import { cn } from "@/lib/utils";
import Safari from "../ui/Safari";
import Experiences from "../../data/experience.data";
import Link from "next/link";
import { IoIosGlobe } from "react-icons/io";

const SNAP_TRANSITION: Transition = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.6,
};

interface ExperienceProps {
    isShifted: boolean;
}

export default function Experience({ isShifted }: ExperienceProps) {

    const experience = isShifted ? Experiences[1] : Experiences[0];

    return (
        <motion.div
            className="absolute top-10 bottom-10 left-10 w-[calc(50%-2.5rem)] z-10 "
            animate={{ x: isShifted ? "0%" : "100%" }}
            transition={SNAP_TRANSITION}
        >
            <Block className={"h-full w-full p-2 flex flex-col gap-y-2 "}>
                <Block
                    className={cn("h-full w-full rounded-[36px] overflow-hidden ")}
                    variant={"gradient"}
                >
                    <div className={cn(
                        "absolute top-9 ",
                        "text-6xl font-extrabold bg-linear-to-b from-primary-light/60 to-transparent bg-clip-text text-transparent ",
                    )}>
                        {experience.company}
                    </div>
                    <div className="absolute top-22 w-150 flex flex-col gap-y-2 ">
                        <Safari
                            src={experience.image}
                            alt={experience.company}
                            size={"400"}
                            url={experience.link}
                        />
                        <div className="flex justify-between px-2 ">
                            <div className="text-xl py-2 font-semibold text-primary-light/90 flex-1 ">
                                {experience.role}
                            </div>
                            <div className="flex flex-1 justify-end gap-x-2 ">
                                <Block
                                    className={cn(
                                        "bg-ink px-5 py-2 rounded-full text-primary-light/60 text-sm",
                                        "shadow-lg "
                                    )}
                                >
                                    {experience.period}
                                </Block>
                                <Link
                                    href={experience.link ?? experience.github}
                                    className="contents"
                                >
                                    <Block
                                        className={cn(
                                            "bg-ink p-2 aspect-square rounded-full text-primary-light/60 text-sm shadow-lg ",
                                        )}
                                    >
                                        <IoIosGlobe size={20} />

                                        {/* <CiLink size={20} /> */}
                                    </Block>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full px-2 text-[13px] text-justify text-primary-light/40 ">
                            {experience.description}
                        </div>
                    </div>
                </Block>
            </Block>
        </motion.div>
    )
}