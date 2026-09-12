"use client";

import { useRef } from "react";

import DynamicIsland from "./DynamicIsland";
import IslandPopup from "./IslandPopup";
import IslandTray from "./IslandTray";
import { useIslandStore } from "../../store/island.store";

// Pinned to the top center of the viewport; survives scrolling.
// Its state is driven by whichever IslandSection is under the viewport center.
export default function IslandBar({ className }: { className?: string }) {
    const state = useIslandStore((s) => s.state);
    const setState = useIslandStore((s) => s.setState);
    const setTray = useIslandStore((s) => s.setTray);
    // Wraps the island so the goo layer behind it can measure it.
    const wrap = useRef<HTMLDivElement>(null);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
            {/* mouseleave here closes the tray once the cursor is off the island and its pills */}
            <div className="relative" onMouseLeave={() => setTray(null)}>
                <IslandTray wrap={wrap} state={state} />
                {/* the "blogs" and "assets" droplets live behind the island and bud out of its ends */}
                <IslandPopup wrap={wrap} state={state} name={"blogs"} side="left" />
                <IslandPopup wrap={wrap} state={state} name={"assets"} side="right" />
                <div ref={wrap} className="pointer-events-auto relative z-10">
                    <DynamicIsland
                        state={state}
                        onClose={() => setState("navbar")}
                        className="scale-120"
                    />
                </div>
            </div>
        </div>
    );
}
