'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Block from "../../ui/Block";
import user from "../../data/user.data";

const ROLE = "web-2 / web-3 developer — founder @Winterfell";
const EMAIL = "anjansuman80@gmail.com";
const TAGLINE =
    "I build interfaces that feel deliberate — motion, type and detail tuned until the whole thing reads as one piece.";

// each element fades up from the same offset, staggered by its index so the
// hero assembles top-to-bottom instead of landing all at once.
const RISE = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

const ease = [0.22, 1, 0.36, 1] as const;

function rise(index: number) {
    return {
        ...RISE,
        transition: { duration: 0.7, delay: 0.1 + index * 0.12, ease },
    };
}

export default function Hero() {
    const lenis = useLenis();

    // the page scrolls under a root Lenis instance, so a native "#projects"
    // anchor jump would land somewhere Lenis then eases away from. Hand the
    // target to Lenis itself and only fall back if it hasn't mounted.
    const scrollToProjects = () => {
        const el = document.getElementById("projects");
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { duration: 1.4 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-ink bg-noise">
            {/* soft light pooled behind the headline, so the gradient text has
                something to sit on instead of flat black */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 opacity-60"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(228,228,228,0.10) 0%, transparent 65%)",
                }}
            />

            <div
                className={cn(
                    "relative flex min-h-screen w-full flex-col items-center justify-center",
                    "gap-8 px-6 py-32 text-center",
                )}
            >
                <motion.div {...rise(0)}>
                    <Block className="gap-2 rounded-full px-4 py-2 text-xs tracking-wide text-primary-light/70">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        Available for new work
                    </Block>
                </motion.div>

                <motion.div {...rise(1)}>
                    <Block className="h-28 w-28 overflow-hidden rounded-2xl p-1 drop-shadow-2xl">
                        <div className="relative h-full w-full">
                            <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                priority
                                sizes="112px"
                                className="rounded-xl object-cover"
                            />
                        </div>
                    </Block>
                </motion.div>

                <motion.h1
                    {...rise(2)}
                    className={cn(
                        "bg-linear-to-b from-primary-light to-primary-light/30 bg-clip-text",
                        "text-6xl font-semibold tracking-tight text-transparent sm:text-7xl md:text-8xl",
                    )}
                >
                    {user.name}
                </motion.h1>

                <motion.p
                    {...rise(3)}
                    className="text-base font-medium text-primary-light/60 sm:text-lg"
                >
                    {ROLE}
                </motion.p>

                <motion.p
                    {...rise(4)}
                    className="max-w-xl text-sm leading-relaxed text-primary-light/40 sm:text-base"
                >
                    {TAGLINE}
                </motion.p>

                <motion.div {...rise(5)} className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={scrollToProjects}
                        className={cn(
                            "cursor-pointer rounded-full bg-primary-light px-6 py-3 text-sm font-medium text-ink",
                            "transition-opacity duration-300 hover:opacity-80",
                        )}
                    >
                        View work
                    </button>
                    <a
                        href={`mailto:${EMAIL}`}
                        className={cn(
                            "rounded-full border border-primary-light/15 bg-cement/10 px-6 py-3 backdrop-blur-md",
                            "text-sm font-medium text-primary-light/80",
                            "transition-colors duration-300 hover:border-primary-light/30 hover:text-primary-light",
                        )}
                    >
                        Get in touch
                    </a>
                </motion.div>
            </div>

            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1, ease }}
                className="absolute inset-x-0 bottom-10 text-center text-[11px] uppercase tracking-[0.3em] text-primary-light/30"
            >
                Scroll
            </motion.span>
        </section>
    );
}
