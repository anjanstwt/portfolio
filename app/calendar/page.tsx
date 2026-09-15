"use client";
import { cn } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }
    const daysInMonth = getDaysInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth(),
    );

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-white ">
            <div className="h-14 w-140 bg-ink/60 rounded-t-3xl px-6 py-2.25 flex items-end gap-x-3 ">
                <div className="p-1 hover:bg-ink rounded-xs transition-colors ease-in-out duration-300 cursor-pointer flex justify-center items-center mb-1">
                    <FaChevronLeft size={12} className="text-neutral-300 " />
                </div>
                <div className="p-1 hover:bg-ink rounded-xs transition-colors ease-in-out duration-300 cursor-pointer flex justify-center items-center mb-1 ">
                    <FaChevronRight size={12} className="text-neutral-300" />
                </div>
                <div className="text-3xl font-light">
                    {months[currentDate.getMonth()]}
                </div>
                <div className="text-2xl font-light text-neutral-400">
                    {currentDate.getFullYear()}
                </div>
            </div>
            <div
                className={cn(
                    "h-100 w-160 bg-ink rounded-3xl",
                    "shadow-[0_1px_10px_0.1px_rgba(0,0,0,0.2)]",
                    "flex flex-col ",
                )}
            >
                <div
                    className={cn(
                        "grid grid-cols-7 px-4 py-3 gap-2.25",
                        "text-sm text-neutral-400",
                    )}
                >
                    {days.map((day) => (
                        <div
                            key={day}
                            className="uppercase flex justify-center items-center"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div
                    className={cn(
                        "flex-1 w-full",
                        "grid grid-cols-7",
                        "p-4 gap-2.25",
                    )}
                >
                    {Array.from({ length: daysInMonth }).map((_date, i) => (
                        <DateDisplay key={i} dateNumber={i + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface DateDisplayProps {
    dateNumber: number;
}

function DateDisplay({ dateNumber }: DateDisplayProps) {
    return (
        <motion.div
            className={cn(
                "w-full h-full bg-[#0E0E0E] rounded-2xl flex justify-center items-end p-0.5 text-neutral-500",
                "",
            )}
        >
            {dateNumber}
        </motion.div>
    );
}
