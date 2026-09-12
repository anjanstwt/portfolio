import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import AssetHeader from "@/components/Assets/AssetHeader";
import AssetStage from "@/components/Assets/AssetStage";
import Assets, { getAsset, kindLabels } from "@/data/assets.data";
import { satisfy } from "@/lib/fonts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return Assets.map((asset) => ({ slug: asset.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const asset = getAsset((await params).slug);
    return asset ? { title: asset.name, description: asset.summary } : {};
}

// One viewport tall, no page scroll: header and title are fixed, the stage
// takes whatever height is left and scrolls inside itself if a piece is
// taller than that (the gallery, say).
export default async function AssetPage({ params }: Params) {
    const { slug } = await params;
    const index = Assets.findIndex((asset) => asset.slug === slug);
    if (index === -1) notFound();

    const asset = Assets[index];
    const prev = Assets[(index - 1 + Assets.length) % Assets.length];
    const next = Assets[(index + 1) % Assets.length];

    return (
        <main className="mx-auto flex h-screen w-full max-w-6xl flex-col px-6 py-8 text-primary-light md:px-10">
            <AssetHeader trail={[asset.slug]} />

            <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-grub pb-6">
                <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary-light/40">
                        {String(index + 1).padStart(2, "0")} · {kindLabels[asset.kind]}
                    </div>
                    <h1 className={`${satisfy.className} mt-2 text-5xl md:text-6xl`}>{asset.name}</h1>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-primary-light/50">{asset.summary}</p>
            </div>

            {/* the piece itself, fully interactive, in the remaining height */}
            {/* data-lenis-prevent: let the wheel scroll this box natively instead of Lenis eating it */}
            <section data-lenis-prevent className="mt-6 min-h-0 flex-1 overflow-auto rounded-2xl border border-grub bg-cement">
                <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
                    <AssetStage slug={asset.slug} />
                </div>
            </section>

            <nav className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-primary-light/50">
                <Link href={`/assets/${prev.slug}`} className="transition-colors hover:text-primary-light">
                    ← {prev.name}
                </Link>
                <Link href={`/assets/${next.slug}`} className="transition-colors hover:text-primary-light">
                    {next.name} →
                </Link>
            </nav>
        </main>
    );
}
