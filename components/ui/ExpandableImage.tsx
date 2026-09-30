"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "cn";

interface ExpandableImageProps {
    src: string;
    alt: string;
    /** Real pixel dimensions of the source image — used so the expanded view keeps its true aspect ratio instead of being cropped/stretched. */
    width: number;
    height: number;
    /** Applied to the collapsed thumbnail's clipping wrapper. */
    className?: string;
    /** Applied to the collapsed <Image> itself (e.g. object-cover, translate offsets). */
    imageClassName?: string;
}

// Click-to-zoom for a single image, independent of ExpandableBlock (which
// forces a square). The expanded view sizes off the image's own intrinsic
// width/height via object-contain, so wide/non-square sources (diagrams,
// screenshots) never get cropped or distorted on expand.
export default function ExpandableImage({
    src,
    alt,
    width,
    height,
    className,
    imageClassName,
}: ExpandableImageProps) {
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
        <>
            <div
                className={cn("relative cursor-pointer", className)}
                onClick={() => setOpen(true)}
                role="button"
                aria-label={`Expand ${alt}`}
            >
                <Image src={src} alt={alt} fill className={imageClassName} unoptimized />
            </div>

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {open && (
                            <>
                                <motion.div
                                    key="backdrop"
                                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setOpen(false)}
                                />
                                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-6">
                                    <motion.div
                                        key="image"
                                        className="pointer-events-auto"
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 24 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        <Image
                                            src={src}
                                            alt={alt}
                                            width={width}
                                            height={height}
                                            className="w-auto h-auto max-w-[90vw] max-h-[90vh] rounded-2xl object-contain"
                                            unoptimized
                                        />
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}
