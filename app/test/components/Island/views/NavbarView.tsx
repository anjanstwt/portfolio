"use client";

import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { navItems } from "../../../data/island.data";
import { useIslandStore } from "../../../store/island.store";
import type { SectionId } from "../../../types/island.type";

export default function NavbarView() {
    const lenis = useLenis();
    const section = useIslandStore((s) => s.section);

    const go = (id: SectionId) => {
        const target = id === "intro" ? 0 : `#${id}`;
        if (lenis) lenis.scrollTo(target, { duration: 1.4 });
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="flex h-full w-full items-center justify-center gap-1 px-2 text-white">
            {navItems.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight transition-colors",
                        section === id
                            ? "bg-white/10 text-white"
                            : "text-neutral-400 hover:text-white",
                    )}
                >
                    {label}
                </button>
            ))}
        </nav>
    );
}
