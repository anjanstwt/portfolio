'use client';
import { motion } from "framer-motion";
import user from "../../data/user.data";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function NewHeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-ink flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.08)_0%,_transparent_70%)]" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="mb-4"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium tracking-wide">
                        Welcome
                    </span>
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary-light tracking-tight leading-tight"
                >
                    Hi, I&apos;m{" "}
                    <span className="text-red-500">{user.name}</span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    className="mt-6 text-lg sm:text-xl text-champagne/60 max-w-xl leading-relaxed"
                >
                    Crafting digital experiences with precision and creativity.
                    Let&apos;s build something remarkable together.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    className="mt-10 flex gap-4"
                >
                    <button className="px-8 py-3.5 rounded-full bg-red-500 text-white font-semibold text-sm tracking-wide hover:bg-red-600 transition-colors duration-200 shadow-lg shadow-red-500/20">
                        Get in Touch
                    </button>
                    <button className="px-8 py-3.5 rounded-full border border-primary-light/20 text-primary-light font-semibold text-sm tracking-wide hover:bg-primary-light/5 transition-colors duration-200">
                        View Projects
                    </button>
                </motion.div>

                <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    className="mt-16 flex items-center gap-2 text-champagne/40 text-sm"
                >
                    <span className="w-8 h-[1px] bg-red-500/40" />
                    <span>Scroll to explore</span>
                    <span className="w-8 h-[1px] bg-red-500/40" />
                </motion.div>
            </div>
        </section>
    );
}
