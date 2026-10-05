"use client";

import { AnimatePresence, motion } from "motion/react";
import { FiMoon, FiSun } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggle } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className={cn(
                "fixed bottom-6 right-6 max-md:bottom-4 max-md:right-4 z-30",
                "size-11 rounded-full cursor-pointer select-none",
                "flex items-center justify-center overflow-hidden",
                "bg-block border-t-[0.5px] border-t-edge",
                "shadow-[0_0_0_1px_var(--t-ring),0_8px_24px_-8px_var(--t-float)]",
                "text-mute hover:text-fg",
                "transition-[color,transform] duration-200 ease-out",
                "hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
                className,
            )}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-center"
                >
                    {isDark ? <FiSun className="size-[18px]" /> : <FiMoon className="size-[18px]" />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
