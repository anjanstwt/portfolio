"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDetailsStore } from "@/store/details.store";
import { DetailPanel } from "@/types/detail.type";
import DetailsPanel from "./DetailsPanel";
import DetailsPanelContent from "./DetailsPanelContent";

export default function DetailsPanelOverlay() {
    const { type, close } = useDetailsStore();

    useEffect(() => {
        if (type === null) return;
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") close();
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [type, close]);

    return (
        <AnimatePresence>
            {type !== null && (
                <>
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        <motion.div
                            key="panel"
                            className="pointer-events-auto"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 24 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <DetailsPanel heading={DetailPanel[type]} onClose={close} className="font-extralight select-none ">
                                <DetailsPanelContent type={type} />
                            </DetailsPanel>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
