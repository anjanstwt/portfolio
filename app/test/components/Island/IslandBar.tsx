"use client";

import DynamicIsland from "./DynamicIsland";
import { useIslandStore } from "../../store/island.store";

// Pinned to the top center of the viewport; survives scrolling.
// Its state is driven by whichever IslandSection is under the viewport center.
export default function IslandBar({ className }: { className?: string }) {
    const state = useIslandStore((s) => s.state);
    const setState = useIslandStore((s) => s.setState);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
            <div className="pointer-events-auto">
                <DynamicIsland state={state} onClose={() => setState("navbar")} className="scale-120" />
            </div>
        </div>
    );
}
