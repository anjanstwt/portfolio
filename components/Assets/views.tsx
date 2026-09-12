"use client";

import Image from "next/image";
import { useState, type ComponentType } from "react";

import Gallery from "@/data/gallery.data";
import { islandStates } from "@/data/island.data";
import Projects from "@/data/project.data";
import type { IslandState } from "@/types/island.type";
import { cn } from "@/lib/utils";

import DynamicIsland from "../Island/DynamicIsland";
import Orbit from "../Orbit/Orbit";
import OrbitSection from "../Orbit/OrbitSection";
import GlassGlyph from "../Projects/Hero/GlassGlyph";
import ParticleTemple from "../Temple/ParticleTemple";
import GithubContribution from "../Contact/GithubContribution";
import Block from "../ui/Block";
import Safari from "../ui/Safari";
import AppleSideBarIcon from "../ui/icons/AppleSideBarIcon";
import Arrow from "../ui/icons/Arrow";
import Clock from "../ui/icons/Clock";
import Hands from "../ui/icons/Hands";
import Logo, { type LogoVariant } from "../ui/icons/Logo";
import { DropletDemo, Loader, LoaderDemo, MenuDemo, TabsDemo } from "../Gooey/demos";

// Each asset has a preview (a quiet, non-interactive tile on /assets) and a
// stage (the full piece on /assets/<slug>). Keyed by the slug in
// data/assets.data.ts.

export interface AssetViews {
    Preview: ComponentType;
    Stage: ComponentType;
}

const MARKS: LogoVariant[] = ["tilde", "maze", "split", "window", "brackets", "stairs", "spiral", "arch"];

const TECH = [
    "anchor", "docker", "git", "kubernetes", "nextjs", "nodejs", "postgresql",
    "prisma", "redis", "rust", "solana", "typescript", "websocket",
];

const glyphProjects = Projects.filter((p) => p.hero?.glyph);

// Small uppercase caption used under items on a stage.
function Caption({ children }: { children: React.ReactNode }) {
    return <div className="text-[10px] uppercase tracking-[0.25em] text-primary-light/40">{children}</div>;
}

/* ─── dynamic island ────────────────────────────────────────────────────── */

function IslandStage() {
    const [state, setState] = useState<IslandState>("music");
    return (
        <div className="flex w-full flex-col items-center gap-14">
            <div className="flex min-h-72 items-center">
                <DynamicIsland state={state} onClose={() => setState("idle")} className="scale-120" />
            </div>
            <div className="flex max-w-xl flex-wrap justify-center gap-2">
                {islandStates.map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => setState(s)}
                        className={cn(
                            "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] transition-colors",
                            s === state
                                ? "border-primary-light/60 text-primary-light"
                                : "border-grub text-primary-light/40 hover:border-primary-light/30 hover:text-primary-light/70",
                        )}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ─── gallery ───────────────────────────────────────────────────────────── */

// Bento layout: spans repeat every ten tiles and dense flow fills the holes,
// so any number of photos packs without gaps. Scrolls inside the stage.
const BENTO = ["col-span-2 row-span-2", "", "", "row-span-2", "", "col-span-2", "", "row-span-2", "col-span-2", ""];

function GalleryStage() {
    return (
        <div className="grid w-full grid-flow-dense grid-cols-2 auto-rows-[120px] gap-3 sm:grid-cols-4 sm:auto-rows-[150px] lg:auto-rows-[180px]">
            {Gallery.map((src, i) => (
                <div
                    key={src}
                    className={cn("group relative overflow-hidden rounded-2xl border border-grub bg-ink", BENTO[i % BENTO.length])}
                >
                    <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, 30vw"
                        className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                </div>
            ))}
        </div>
    );
}

/* ─── registry ──────────────────────────────────────────────────────────── */

export const assetViews: Record<string, AssetViews> = {
    "particle-temple": {
        Preview: () => (
            <div className="absolute inset-0">
                <ParticleTemple className="h-full w-full" />
            </div>
        ),
        // Sized from the viewport so it fits the fixed-height stage without scrolling.
        Stage: () => <ParticleTemple className="h-[calc(100vh-22rem)] min-h-64 max-w-full aspect-[1215/1390]" />,
    },

    gooey: {
        Preview: () => <Loader size={26} spread={40} />,
        Stage: () => (
            <div className="flex w-full flex-col items-center gap-12">
                <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
                    <div className="flex flex-col items-center gap-4">
                        <DropletDemo />
                        <Caption>droplet · pull the small piece away</Caption>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <MenuDemo />
                        <Caption>menu · tap the button</Caption>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <TabsDemo />
                        <Caption>tabs · the active one bulges</Caption>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <LoaderDemo />
                        <Caption>loader · drops swimming through each other</Caption>
                    </div>
                </div>
            </div>
        ),
    },

    "dynamic-island": {
        Preview: () => <DynamicIsland state="music" onClose={() => {}} className="scale-75" />,
        Stage: IslandStage,
    },

    orbit: {
        Preview: () => (
            <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(70% 70% at 50% 45%, #161617 0%, #0f0f10 60%, #0a0a0a 100%)" }}
            >
                <Orbit className="absolute inset-0 h-full w-full" />
            </div>
        ),
        // OrbitSection is h-screen by default; the wrapper sets the real height.
        Stage: () => (
            <div className="h-[calc(100vh-22rem)] min-h-64 w-full overflow-hidden rounded-xl">
                <OrbitSection className="h-full!" />
            </div>
        ),
    },

    clock: {
        // The hands overrun the face on purpose, so the preview stays small.
        Preview: () => <Clock size={56} />,
        Stage: () => <Clock size={128} />,
    },

    "glass-glyphs": {
        Preview: () => {
            const glyph = glyphProjects[0]?.hero?.glyph;
            return glyph ? <GlassGlyph glyph={glyph} fill="flat" className="w-32" /> : null;
        },
        Stage: () => (
            <div className="flex flex-wrap items-end justify-center gap-16">
                {glyphProjects.map((p) => (
                    <div key={p.slug} className="flex flex-col items-center gap-6">
                        <GlassGlyph glyph={p.hero!.glyph!} fill={p.hero!.fill} className="w-44" />
                        <Caption>{p.name}</Caption>
                    </div>
                ))}
            </div>
        ),
    },

    safari: {
        Preview: () => (
            <div className="absolute left-[10%] top-[14%] w-[110%]">
                <Safari url="anjan.dev" src="/gallery/img9.jpg" alt="" size="220" className="w-full" />
            </div>
        ),
        Stage: () => <Safari url="anjan.dev" src="/gallery/img9.jpg" alt="" size="480" className="max-w-full" />,
    },

    "glass-block": {
        Preview: () => (
            <Block className="h-28 w-28 rounded-xl">
                <div className="h-full w-full" />
            </Block>
        ),
        Stage: () => (
            <div className="flex flex-wrap items-end justify-center gap-14">
                <div className="flex flex-col items-center gap-6">
                    <Block className="h-52 w-52 p-1">
                        <div className="relative h-full w-full overflow-hidden rounded-[40px]">
                            <Image src="/images/profile.jpeg" alt="" fill sizes="208px" className="object-cover" />
                        </div>
                    </Block>
                    <Caption>default</Caption>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <Block variant="gradient" className="h-52 w-52">
                        <div className="h-full w-full" />
                    </Block>
                    <Caption>gradient</Caption>
                </div>
            </div>
        ),
    },

    "contribution-graph": {
        Preview: () => (
            <div className="w-[190%] origin-center scale-[0.52]">
                <GithubContribution />
            </div>
        ),
        Stage: () => <GithubContribution className="max-w-4xl" />,
    },

    marks: {
        Preview: () => (
            <div className="grid grid-cols-4 gap-x-6 gap-y-5 text-primary-light">
                {MARKS.map((v) => (
                    <Logo key={v} variant={v} size={30} />
                ))}
            </div>
        ),
        Stage: () => (
            <div className="grid grid-cols-2 gap-x-12 gap-y-14 text-primary-light sm:grid-cols-4">
                {MARKS.map((v) => (
                    <div key={v} className="flex flex-col items-center gap-6">
                        <div className="flex h-24 items-center">
                            <Logo variant={v} size={110} />
                        </div>
                        <Caption>{v}</Caption>
                    </div>
                ))}
            </div>
        ),
    },

    icons: {
        Preview: () => <Hands size={170} color="#e4e4e4" />,
        Stage: () => (
            <div className="flex flex-wrap items-end justify-center gap-16">
                <div className="flex flex-col items-center gap-6">
                    <Hands size={360} color="#e4e4e4" />
                    <Caption>hands</Caption>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <Arrow size={260} color="#e4e4e4" />
                    <Caption>arrow</Caption>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <AppleSideBarIcon size={72} color="#e4e4e4" />
                    <Caption>sidebar</Caption>
                </div>
            </div>
        ),
    },

    "tech-stack": {
        Preview: () => (
            <div className="grid grid-cols-3 gap-5">
                {TECH.slice(0, 9).map((t) => (
                    <div key={t} className="relative h-8 w-8">
                        <Image src={`/tech/${t}.png`} alt="" fill sizes="32px" className="object-contain" />
                    </div>
                ))}
            </div>
        ),
        Stage: () => (
            <div className="grid grid-cols-3 gap-x-10 gap-y-12 sm:grid-cols-5">
                {TECH.map((t) => (
                    <div key={t} className="flex flex-col items-center gap-5">
                        <div className="relative h-14 w-14">
                            <Image src={`/tech/${t}.png`} alt={t} fill sizes="56px" className="object-contain" />
                        </div>
                        <Caption>{t}</Caption>
                    </div>
                ))}
            </div>
        ),
    },

    gallery: {
        Preview: () => (
            <div className="grid h-full w-full grid-flow-dense grid-cols-3 grid-rows-2 gap-1 p-1">
                {Gallery.slice(0, 5).map((src, i) => (
                    <div key={src} className={cn("relative overflow-hidden rounded-md", i === 0 && "col-span-2 row-span-2")}>
                        <Image src={src} alt="" fill sizes="200px" className="object-cover grayscale" />
                    </div>
                ))}
            </div>
        ),
        Stage: GalleryStage,
    },
};
