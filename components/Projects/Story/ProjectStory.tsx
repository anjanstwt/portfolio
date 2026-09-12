"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { satisfy } from "@/lib/fonts";
import type { ProjectStoryChapter, ProjectStoryData, ProjectType } from "../../../types/project.type";
import type { HeroProject } from "../../../data/project.data";
import ProjectGlyph from "../Hero/ProjectGlyph";
import Logo from "../../ui/icons/Logo";

// The part of a project page under the glass hero, told as a scroll story:
//
//   lede      — the summary set large, with a strip of facts beside it
//   chapters  — a pinned image stage on the left that crossfades as the
//               text chapters scroll past on the right, with a progress
//               rail and ghosted numerals marking where you are
//   next      — a card for the following project, glyph and all
//
// Below md everything stacks: each chapter carries its own image and the
// rail is hidden.

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#ff4000";

const rgba = (hex: string, alpha: number) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};

const linkLabel: Record<string, string> = { live: "live", repo: "source" };
const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
    project: ProjectType;
    story: ProjectStoryData;
    next: HeroProject;
}

export default function ProjectStory({ project, story, next }: Props) {
    const reduceMotion = useReducedMotion();
    const color = project.color ?? "#e4e4e4";
    const reveal = reduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-10% 0px" },
              transition: { duration: 1, ease: EASE },
          };

    return (
        // no overflow-hidden here: it would break the sticky stage and rail
        <section className="relative bg-ink text-primary-light">
            {/* a wash of the project's colour bleeding down from the hero */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
                style={{ background: `radial-gradient(60% 60% at 50% 0%, ${rgba(color, 0.14)} 0%, transparent 100%)` }}
            />

            <Lede project={project} story={story} reveal={reveal} />
            <Chapters chapters={story.chapters} color={color} reveal={reveal} reduceMotion={!!reduceMotion} />
            <NextCard next={next} reveal={reveal} />
        </section>
    );
}

/* ─── lede ──────────────────────────────────────────────────────────────── */

function Lede({ project, story, reveal }: { project: ProjectType; story: ProjectStoryData; reveal: object }) {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10 md:pt-40">
            <motion.div {...reveal} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-primary-light/40">
                <span className="h-px w-10 bg-primary-light/30" />
                the story
            </motion.div>

            <motion.h2 {...reveal} className="mt-10 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {project.summary.replace(/\.$/, "")}
                <span style={{ color: ACCENT }}>.</span>
            </motion.h2>

            <motion.div {...reveal} className="mt-14 grid gap-8 border-y border-grub py-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
                {story.facts?.length ? (
                    <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
                        {story.facts.map((fact) => (
                            <div key={fact.label}>
                                <dt className="text-[10px] uppercase tracking-[0.25em] text-primary-light/40">{fact.label}</dt>
                                <dd className="mt-2 text-sm text-primary-light/80">{fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                ) : (
                    <div />
                )}
                {project.links?.length ? (
                    <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-primary-light/60">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 transition-colors hover:text-primary-light"
                            >
                                {linkLabel[link.kind] ?? link.kind}
                                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                            </a>
                        ))}
                    </div>
                ) : null}
            </motion.div>
        </div>
    );
}

/* ─── chapters ──────────────────────────────────────────────────────────── */

function Chapters({
    chapters,
    color,
    reveal,
    reduceMotion,
}: {
    chapters: ProjectStoryChapter[];
    color: string;
    reveal: object;
    reduceMotion: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    // Progress down the chapter run, for the rail.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    // Gentle parallax on the pinned stage so it drifts against the text.
    const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [24, -24]);

    return (
        <div ref={ref} className="mx-auto w-full max-w-6xl px-6 md:px-10">
            <div className="md:grid md:grid-cols-[2.5rem_1fr_1fr] md:gap-x-10 lg:grid-cols-[2.5rem_1.1fr_1fr] lg:gap-x-16">
                {/* rail */}
                <div className="hidden md:block">
                    <div className="sticky top-0 flex h-screen flex-col items-center py-24">
                        <div className="relative w-px flex-1 bg-grub">
                            <motion.div
                                style={{ scaleY: progress, backgroundColor: color }}
                                className="absolute inset-x-0 top-0 h-full origin-top"
                            />
                        </div>
                        <div className="absolute inset-y-24 flex flex-col justify-between">
                            {chapters.map((c, i) => (
                                <div
                                    key={c.title}
                                    className={cn(
                                        "relative left-1/2 flex -translate-x-1/2 items-center justify-center text-[10px] tabular-nums transition-colors duration-500",
                                        i <= active ? "text-primary-light" : "text-primary-light/30",
                                    )}
                                >
                                    <span className="rounded-full bg-ink px-1 py-2">{pad(i + 1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* pinned image stage */}
                <div className="hidden md:block">
                    <div className="sticky top-0 flex h-screen items-center">
                        <motion.div style={{ y: drift }} className="relative w-full">
                            <Stage chapters={chapters} active={active} color={color} />
                        </motion.div>
                    </div>
                </div>

                {/* text */}
                <ol>
                    {chapters.map((chapter, i) => (
                        <Chapter
                            key={chapter.title}
                            chapter={chapter}
                            index={i}
                            total={chapters.length}
                            color={color}
                            reveal={reveal}
                            onActive={() => setActive(i)}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
}

// The image for the active chapter, crossfading as it changes. Framed the
// same way as the project cards, with the project's colour glowing behind.
function Stage({ chapters, active, color }: { chapters: ProjectStoryChapter[]; active: number; color: string }) {
    const chapter = chapters[active] ?? chapters[0];
    return (
        <div className="relative">
            <div
                aria-hidden
                className="absolute -inset-[16%] rounded-full"
                style={{ background: `radial-gradient(closest-side, ${rgba(color, 0.22)} 0%, ${rgba(color, 0.06)} 50%, transparent 100%)` }}
            />
            <div className="relative rounded-xl border border-primary-light/30 bg-ink p-1.5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-primary-light/30 bg-cement">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={chapter.image + active}
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="absolute inset-0"
                        >
                            <Image src={chapter.image} alt={chapter.alt ?? ""} fill sizes="50vw" className="object-cover" />
                        </motion.div>
                    </AnimatePresence>
                    <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/80 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-primary-light/70">
                        <span>fig. {pad(active + 1)}</span>
                        <span className="h-px w-6 bg-primary-light/40" />
                        <span className="text-primary-light/50">{chapter.title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Chapter({
    chapter,
    index,
    total,
    color,
    reveal,
    onActive,
}: {
    chapter: ProjectStoryChapter;
    index: number;
    total: number;
    color: string;
    reveal: object;
    onActive: () => void;
}) {
    const ref = useRef<HTMLLIElement>(null);

    // Becomes the active chapter when it crosses the middle of the viewport.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => entry.isIntersecting && onActive(), {
            rootMargin: "-50% 0px -50% 0px",
        });
        io.observe(el);
        return () => io.disconnect();
    }, [onActive]);

    return (
        <li ref={ref} className="flex min-h-[70vh] flex-col justify-center py-16 md:min-h-screen md:py-0">
            {/* the image travels with the text below md */}
            <motion.div {...reveal} className="mb-10 md:hidden">
                <div className="rounded-xl border border-primary-light/30 bg-ink p-1.5">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-primary-light/30">
                        <Image src={chapter.image} alt={chapter.alt ?? ""} fill sizes="90vw" className="object-cover" />
                    </div>
                </div>
            </motion.div>

            <motion.div {...reveal} className="relative">
                {/* ghosted numeral, like the name in the hero */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -left-3 -top-16 select-none bg-linear-to-b from-primary-light/12 to-transparent bg-clip-text text-[9rem] font-semibold leading-none tracking-tighter text-transparent md:-top-24 md:text-[12rem]"
                >
                    {pad(index + 1)}
                </div>

                <div className="relative">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary-light/40">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                        chapter {pad(index + 1)} of {pad(total)}
                    </div>
                    <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">{chapter.title}</h3>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-primary-light/60 md:text-lg">{chapter.text}</p>
                </div>
            </motion.div>
        </li>
    );
}

/* ─── next project ──────────────────────────────────────────────────────── */

function NextCard({ next, reveal }: { next: HeroProject; reveal: object }) {
    const color = next.color ?? "#e4e4e4";
    return (
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pt-16">
            <motion.div {...reveal}>
                <Link
                    href={`/projects/${next.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-grub bg-cement px-8 py-14 transition-colors duration-500 hover:border-primary-light/30 md:px-14 md:py-20"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] rounded-full opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                        style={{ background: `radial-gradient(closest-side, ${rgba(color, 0.28)} 0%, transparent 100%)` }}
                    />
                    <div className="relative flex items-center justify-between gap-10">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-primary-light/40">next project</div>
                            <div className={`${satisfy.className} mt-5 text-5xl md:text-7xl`}>{next.name}</div>
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-light/50">{next.summary}</p>
                            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary-light/60">
                                read the story
                                <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                            </div>
                        </div>
                        <div className="hidden w-40 shrink-0 md:block lg:w-56">
                            {next.hero.glyph ? (
                                <ProjectGlyph
                                    glyph={next.hero.glyph}
                                    colored={next.hero.fill === "flat"}
                                    className="h-auto w-full text-primary-light transition-transform duration-700 ease-out group-hover:-translate-y-2"
                                />
                            ) : next.hero.image ? (
                                <div className="relative aspect-square w-full">
                                    <Image src={next.hero.image} alt="" fill sizes="224px" className="object-contain" />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* no reveal here: at the page bottom it would never enter the viewport margin */}
            <div className="mt-16 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-primary-light/50">
                <Link href="/" className="flex items-center gap-2 transition-colors hover:text-primary-light">
                    <Logo variant="tilde" size={26} />
                    <span>/anjan</span>
                </Link>
                <span className="text-primary-light/30">end</span>
            </div>
        </div>
    );
}
