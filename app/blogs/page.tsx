import type { Metadata } from "next";
import Link from "next/link";

import Logo from "@/components/ui/icons/Logo";
import { satisfy } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "Blogs",
    description: "Writing, soon.",
};

// Placeholder so the island's "blogs" pill has somewhere to land.
export default function BlogsPage() {
    return (
        <main className="mx-auto flex h-screen w-full max-w-6xl flex-col px-6 py-8 text-primary-light md:px-10">
            <header className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-light/50">
                <Link href="/" className="flex items-center transition-colors hover:text-primary-light" aria-label="home">
                    <Logo variant="tilde" size={26} />
                </Link>
                <span className="text-primary-light/80">/blogs</span>
            </header>

            <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-b border-grub pb-8">
                <h1 className={`${satisfy.className} text-6xl md:text-7xl`}>Blogs</h1>
                <p className="max-w-sm text-sm leading-relaxed text-primary-light/50">Nothing here yet. Writing lands soon.</p>
            </div>
        </main>
    );
}
