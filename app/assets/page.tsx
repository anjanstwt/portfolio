import type { Metadata } from "next";

import AssetGrid from "@/components/Assets/AssetGrid";
import AssetHeader from "@/components/Assets/AssetHeader";
import Assets from "@/data/assets.data";
import { satisfy } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "Assets",
    description: "Components, marks, icons and images from around the site.",
};

export default function AssetsPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 pb-32 pt-8 text-primary-light md:px-10">
            <AssetHeader />

            <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-b border-grub pb-8">
                <h1 className={`${satisfy.className} text-6xl md:text-7xl`}>Assets</h1>
                <p className="max-w-sm text-sm leading-relaxed text-primary-light/50">
                    Components, marks, icons and images from around the site, each on its own page.
                </p>
            </div>

            <div className="mt-6 text-[10px] uppercase tracking-[0.25em] text-primary-light/40">
                {Assets.length} pieces
            </div>

            <div className="mt-10">
                <AssetGrid assets={Assets} />
            </div>
        </main>
    );
}
