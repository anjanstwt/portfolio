import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const nowPlaying = await getNowPlaying();
        return NextResponse.json(nowPlaying);
    } catch (error) {
        console.error("[spotify/now-playing]", error);
        // Fail soft — the widget falls back to its static content.
        return NextResponse.json({ isPlaying: false });
    }
}
