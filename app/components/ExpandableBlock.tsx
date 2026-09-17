"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

interface ExpandableBlockProps {
    children: ReactNode;
    className?: string;
}

export default function ExpandableBlock({ children, className }: ExpandableBlockProps) {
    const id = useId();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <div className={className}>
            <motion.div
                layoutId={id}
                onClick={() => setOpen(true)}
                className="w-full h-full cursor-pointer"
                style={{ visibility: open ? "hidden" : "visible" }}
            >
                {children}
            </motion.div>

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {open && (
                            <>
                                <motion.div
                                    key="backdrop"
                                    className="fixed inset-0 z-40 bg-black/70"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setOpen(false)}
                                />
                                <motion.div
                                    key="expanded"
                                    layoutId={id}
                                    className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(85vw,640px)] h-[min(85vh,640px)]"
                                >
                                    {children}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
}
