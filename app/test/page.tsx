"use client";

/**
 * Every component on the portfolio home page, in one file.
 *
 * External dependency: HeroCrab (components/app-logo/Crab) — the animated Lomi
 * mascot, which is its own multi-file component and is left imported.
 *
 * Required CSS tokens (app/globals.css): --ink, --mute, --page, exposed to
 * Tailwind as text-ink / text-mute / bg-page, plus an html.dark block that
 * overrides them.
 */

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { TbCheck, TbMailFilled } from "react-icons/tb";
// import HeroCrab from "@/components/app-logo/Crab";

const EMAIL = "piyushraj26102004@gmail.com";

/* ------------------------------------------------------------------ *
 * EdgeBlur — progressive blur at the top and bottom of the viewport
 * ------------------------------------------------------------------ */

/**
 * Four stacked backdrop layers ramp from 4px to 48px so content visibly
 * dissolves as it scrolls past the edge.
 */
export function EdgeBlur() {
    return (
        <>
            {/* top */}
            <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-20">
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)] backdrop-blur-[4px]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_45%)] backdrop-blur-[12px]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_26%)] backdrop-blur-[28px]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_13%)] backdrop-blur-[48px]" />
            </div>

            {/* bottom */}
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-20">
                <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)] backdrop-blur-[4px]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_45%)] backdrop-blur-[12px]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_26%)] backdrop-blur-[28px]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_13%)] backdrop-blur-[48px]" />
            </div>
        </>
    );
}

/* ------------------------------------------------------------------ *
 * BlurFade — scroll-in reveal
 * ------------------------------------------------------------------ */

export function BlurFade({
    className,
    delay = 0,
    duration = 2.0,
    children,
}: {
    className?: string;
    delay?: number;
    duration?: number;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 12, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            // amount 0.5 never fires for sections taller than a phone viewport.
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
            transition={{ duration: duration, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ *
 * HomeHero
 * ------------------------------------------------------------------ */

/** Clipboard API, falling back to execCommand where it is blocked (http origins, older browsers). */
async function copyEmail() {
    try {
        await navigator.clipboard.writeText(EMAIL);
        return true;
    } catch {
        const field = document.createElement("textarea");
        field.value = EMAIL;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        return ok;
    }
}

export function HomeHero() {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        copyEmail().then((ok) => {
            if (!ok) return;
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
            // The bottom bar listens for this to swap its mail icon for a check.
            window.dispatchEvent(new Event("email-copied"));
        });
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (
                e.key.toLowerCase() !== "c" ||
                e.metaKey ||
                e.ctrlKey ||
                e.altKey
            )
                return;
            const target = e.target as HTMLElement | null;
            if (
                target?.isContentEditable ||
                ["INPUT", "TEXTAREA"].includes(target?.tagName ?? "")
            )
                return;
            handleCopy();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleCopy]);

    return (
        <section className="w-full">
            <div className="mt-16">
                <div className="relative w-fit">
                    <div className="relative size-14 overflow-hidden rounded-[14px]">
                        <Image
                            src="/images/pfp/me.png"
                            alt="Piyush Raj"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <span className="ring-page absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full bg-[#30a46c] ring-[3px]" />
                </div>

                <h1 className="text-ink mt-6 flex items-center gap-1.5 text-[15px] leading-6 font-medium">
                    Piyush Raj
                    <RiVerifiedBadgeFill className="size-[16px] text-[#1d9bf0]" />
                </h1>

                <p className="text-mute text-[15px] leading-[1.6]">
                    Designer &amp; Developer
                </p>

                <p className="text-mute mt-7 max-w-[42rem] text-[15px] leading-[1.6]">
                    Hey, I&apos;m Piyush a full-stack engineer at{" "}
                    <span className="text-ink font-medium whitespace-nowrap">
                        Lomi{" "}
                        {/*<HeroCrab
                            size={24}
                            color="#4189d6"
                            className="-translate-y-[2px] align-middle"
                        />*/}
                    </span>{" "}
                    based in India{" "}
                    <span className="mr-0.5 whitespace-nowrap">🇮🇳</span> where I
                    specialize in crafting polished web interfaces with a strong
                    focus on accessibility, web animation, and product design.
                </p>

                <p className="text-mute mt-7 flex items-center gap-2 text-[15px] leading-[1.6]">
                    Press
                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Copy my email"
                        className="text-mute bg-ink/8 dark:bg-ink/12 relative inline-flex h-[24px] min-w-[24px] cursor-pointer items-center justify-center rounded-[6px] px-1.5 font-sans text-[13px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-1px_0_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.5)]"
                    >
                        {/* Same cross-fade-through-blur as the bottom bar's mail icon. */}
                        <span
                            className="transition-all duration-300"
                            style={{
                                opacity: copied ? 0 : 1,
                                filter: copied ? "blur(4px)" : "blur(0px)",
                                transform: copied ? "scale(0.8)" : "scale(1)",
                            }}
                        >
                            C
                        </span>
                        <TbCheck
                            className="absolute inset-0 m-auto size-3.5 transition-all duration-300"
                            style={{
                                opacity: copied ? 1 : 0,
                                filter: copied ? "blur(0px)" : "blur(4px)",
                                transform: copied ? "scale(1)" : "scale(0.8)",
                            }}
                        />
                    </button>
                    to copy my email
                </p>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ *
 * HomeExperience
 * ------------------------------------------------------------------ */

type Experience = {
    period: string;
    role: string;
    company: string;
    href?: string;
    description: string;
};

const EXPERIENCES: Experience[] = [
    {
        period: "JULY 2026 — NOW",
        role: "Full-stack engineer at",
        company: "Lomi",
        href: "https://app.heylomi.ai",
        description:
            "Working with the web team on an AI multiplayer application, where I own most of the design and integration work across the frontend.",
    },
    {
        period: "MAY — JULY 2026",
        role: "Full-stack engineer at",
        company: "SpiderSkill",
        href: "https://spiderskill.com",
        description:
            "Built the company's job search platform from scratch, covering the data model, search and matching, and the candidate UI.",
    },
    {
        period: "DEC 3, 2025",
        role: "Open-source contributor at",
        company: "Twenty",
        href: "https://github.com/twentyhq/twenty/pull/16267",
        description:
            "Added recursive text extraction for note previews so text, links, and nested Blocknote nodes render consistently. Closed #16043.",
    },
];

export function HomeExperience() {
    return (
        <section className="mt-24">
            <h2 className="text-mute font-mono text-[13px] leading-4 tracking-[0.04em] uppercase">
                Experience
            </h2>

            <p className="text-mute mt-7 max-w-[42rem] text-[15px] leading-[1.6]">
                Throughout my career, I&apos;ve worked on various projects, from
                building scalable systems to designing user-friendly interfaces.
                Here&apos;s a brief overview.
            </p>

            <div className="mt-12 flex flex-col gap-y-10">
                {EXPERIENCES.map((item) => (
                    <div
                        key={item.company}
                        className="flex flex-col gap-y-1 md:flex-row md:gap-y-0"
                    >
                        <div className="text-mute font-mono text-[13px] leading-4 tracking-[0.04em] uppercase md:w-44 md:shrink-0 md:pt-1">
                            {item.period}
                        </div>

                        <div className="max-w-[42rem]">
                            <h3 className="text-ink flex flex-wrap items-center gap-x-2 text-[15px] leading-6">
                                {item.role}
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-x-2 transition-opacity hover:opacity-70"
                                    >
                                        {item.company}
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-x-2">
                                        {item.company}
                                    </span>
                                )}
                            </h3>

                            <p className="text-mute mt-1 text-[15px] leading-[1.6]">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ *
 * HomeProjects
 * ------------------------------------------------------------------ */

type Project = {
    name: string;
    description: string;
    href: string;
};

const PROJECTS: Project[] = [
    {
        name: "Riva",
        description:
            "A component library for picky maniacs, built for motion-heavy interfaces and shipped as copy-paste source you own.",
        href: "https://riva.piyushraj.site",
    },
    {
        name: "Winterfell",
        description:
            "An AI-powered platform for writing, testing and deploying Anchor smart contracts on Solana, straight from the browser.",
        href: "https://winterfell.dev",
    },
    {
        name: "Nocturn",
        description:
            "A real-time quiz app where players stake crypto on a match, with rooms synced over websockets and payouts settled on-chain.",
        href: "https://nocturn.app",
    },
];

/** Left-column label: the href stripped of its protocol, to match the mono date column. */
const label = (href: string) =>
    href.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function HomeProjects() {
    return (
        <section className="mt-24">
            <h2 className="text-mute font-mono text-[13px] leading-4 tracking-[0.04em] uppercase">
                Projects
            </h2>

            <div className="mt-7 flex flex-col gap-y-10">
                {PROJECTS.map((project) => {
                    const external = project.href.startsWith("http");
                    return (
                        <div
                            key={project.name}
                            className="flex flex-col gap-y-1 md:flex-row md:gap-y-0"
                        >
                            <a
                                href={project.href}
                                target={external ? "_blank" : undefined}
                                rel="noreferrer"
                                className="text-mute font-mono text-[13px] leading-4 tracking-[0.04em] transition-opacity hover:opacity-70 md:w-44 md:shrink-0 md:pt-1 md:pr-4"
                            >
                                {label(project.href)}
                            </a>

                            <div className="max-w-[42rem]">
                                <a
                                    href={project.href}
                                    target={external ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="text-ink text-[15px] leading-6 transition-opacity hover:opacity-70"
                                >
                                    {project.name}
                                </a>
                                <p className="text-mute text-[15px] leading-[1.6]">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ *
 * BottomBar
 * ------------------------------------------------------------------ */

const CIRCUMFERENCE = 2 * Math.PI * 8.5;

/** Tiled dot column separating the segments. */
function Divider() {
    const id = useId().replace(/:/g, "");
    return (
        <div
            className="relative h-8 w-3 shrink-0 self-center"
            aria-hidden="true"
        >
            <svg
                className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-20 block h-full -translate-x-1/2"
                style={{ width: "3px" }}
                preserveAspectRatio="none"
            >
                <defs>
                    <pattern
                        id={id}
                        width="4"
                        height="6"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle
                            cx="2"
                            cy="3"
                            r="1"
                            className="fill-neutral-300 dark:fill-neutral-700"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${id})`} />
            </svg>
        </div>
    );
}

export function BottomBar() {
    const [dark, setDark] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(
        () => setDark(document.documentElement.classList.contains("dark")),
        [],
    );

    useEffect(() => {
        const onScroll = () => {
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onCopied = () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        };
        window.addEventListener("email-copied", onCopied);
        return () => window.removeEventListener("email-copied", onCopied);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="pointer-events-auto flex flex-col overflow-hidden rounded-[15px] border border-black/10 bg-white/95 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] ring-1 ring-neutral-200/50 ring-offset-2 ring-offset-[var(--page)] backdrop-blur-2xl ring-inset dark:border-white/4 dark:bg-neutral-950/95 dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] dark:ring-neutral-800/20">
                <div className="flex items-center justify-center gap-2 p-1">
                    <button
                        type="button"
                        onClick={toggle}
                        className="group relative ml-1 flex cursor-pointer flex-col items-start gap-0 rounded-lg px-3 py-1.5 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/6"
                    >
                        <span className="text-xs font-medium text-neutral-900 dark:text-neutral-200">
                            {dark ? "Dark" : "Light"}
                        </span>
                    </button>

                    <Divider />

                    <div className="flex max-w-44 min-w-0 items-center gap-2 pl-0.5">
                        <div
                            className="relative size-6 shrink-0"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(progress * 100)}
                            aria-label="Page scroll progress"
                        >
                            <svg
                                className="size-6 -rotate-90 text-neutral-300 dark:text-neutral-600/70"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="8.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <svg
                                className="pointer-events-none absolute inset-0 size-6 -rotate-90 text-[#2667ff]"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="8.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={CIRCUMFERENCE}
                                    strokeDashoffset={
                                        CIRCUMFERENCE * (1 - progress)
                                    }
                                />
                            </svg>
                        </div>

                        <div className="min-w-0 flex-1">
                            <button
                                type="button"
                                className="block cursor-pointer truncate text-xs font-medium text-neutral-900 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                            >
                                Gallery
                            </button>
                        </div>
                    </div>

                    <Divider />

                    <div className="-ml-1 flex items-center gap-1 pr-2 pl-1">
                        <a
                            href={`mailto:${EMAIL}`}
                            aria-label={copied ? "Email copied" : "Email"}
                            className="relative cursor-pointer rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/6 dark:hover:text-neutral-100"
                        >
                            {/* The two glyphs sit on top of each other and cross-fade through a blur. */}
                            <TbMailFilled
                                className="size-4 transition-all duration-300"
                                style={{
                                    opacity: copied ? 0 : 1,
                                    filter: copied ? "blur(4px)" : "blur(0px)",
                                    transform: copied
                                        ? "scale(0.8)"
                                        : "scale(1)",
                                }}
                            />
                            <TbCheck
                                className="absolute inset-0 m-auto size-4 transition-all duration-300"
                                style={{
                                    opacity: copied ? 1 : 0,
                                    filter: copied ? "blur(0px)" : "blur(4px)",
                                    transform: copied
                                        ? "scale(1)"
                                        : "scale(0.8)",
                                }}
                            />
                        </a>
                        {[
                            {
                                href: "https://github.com/piyush-rj",
                                label: "GitHub",
                                icon: <FaGithub className="size-[15px]" />,
                            },
                            {
                                href: "https://x.com/PiyushC2P",
                                label: "X",
                                icon: <RiTwitterXFill className="size-3.5" />,
                            },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={
                                    item.href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel="noreferrer"
                                aria-label={item.label}
                                className="cursor-pointer rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/6 dark:hover:text-neutral-100"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default function Home() {
    return (
        <div className="bg-board-white flex min-h-screen w-full justify-center">
            <div className="w-full max-w-[700px] px-6 pt-14 pb-24 md:px-8">
                <BlurFade>
                    <HomeHero />
                </BlurFade>
                <BlurFade delay={0.1}>
                    <HomeExperience />
                </BlurFade>
                <BlurFade delay={0.15}>
                    <HomeProjects />
                </BlurFade>
            </div>

            <EdgeBlur />
            <BottomBar />
        </div>
    );
}
