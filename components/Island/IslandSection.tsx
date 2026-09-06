"use client";

import { useEffect, useRef } from "react";
import { useIslandStore } from "../../store/island.store";
import type { IslandState, SectionId } from "../../types/island.type";

// Wraps a page section. When the section crosses the vertical center of the
// viewport it becomes the active one and the island switches to `state`.
// The id doubles as the scroll target for the navbar links.
export default function IslandSection({
    id,
    state,
    children,
}: {
    id: SectionId;
    state: IslandState;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const activate = useIslandStore((s) => s.activate);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // A thin band around the viewport center; the section covering it wins.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) activate(id, state);
            },
            { rootMargin: "-49% 0px -49% 0px", threshold: 0 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [id, state, activate]);

    return (
        <div ref={ref} id={id}>
            {children}
        </div>
    );
}
