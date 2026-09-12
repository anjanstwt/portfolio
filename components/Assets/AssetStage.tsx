"use client";

import { assetViews } from "./views";

// Client bridge for the server-rendered /assets/<slug> page: looks the piece
// up in the registry and mounts its full-size stage.
export default function AssetStage({ slug }: { slug: string }) {
    const Stage = assetViews[slug]?.Stage;
    return Stage ? <Stage /> : null;
}
