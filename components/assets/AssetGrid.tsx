"use client";

import Link from "next/link";

import type { AssetType } from "@/types/asset.type";
import { kindLabels } from "@/data/assets.data";

import { assetViews } from "./views";

// The gallery on /assets. Previews sit under a pointer-events-none layer so
// the whole tile is one link; the piece itself only responds on its own page.
export default function AssetGrid({ assets }: { assets: AssetType[] }) {
    return (
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset, i) => {
                const Preview = assetViews[asset.slug]?.Preview;
                return (
                    <li key={asset.slug}>
                        <Link href={`/assets/${asset.slug}`} className="group block">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-grub bg-cement transition-colors duration-300 group-hover:border-primary-light/30">
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    {Preview ? <Preview /> : null}
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline justify-between gap-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[10px] tabular-nums text-primary-light/30">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-sm text-primary-light transition-colors group-hover:text-white">{asset.name}</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-primary-light/40">{kindLabels[asset.kind]}</span>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
