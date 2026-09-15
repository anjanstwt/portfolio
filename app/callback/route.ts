import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
        return new NextResponse(`Spotify auth error: ${error}`, { status: 400 });
    }
    if (!code) {
        return new NextResponse("Missing code", { status: 400 });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        return new NextResponse("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET", { status: 500 });
    }

    const redirectUri = new URL("/callback", request.url).toString();

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
        }),
    });

    if (!tokenRes.ok) {
        return new NextResponse(`Token exchange failed: ${await tokenRes.text()}`, { status: 500 });
    }

    const data = (await tokenRes.json()) as { refresh_token: string };

    return new NextResponse(
        `<pre style="font-family:monospace;white-space:pre-wrap;padding:24px;background:#0c0c0c;color:#eee;">` +
            `Copy this into .env.local as SPOTIFY_REFRESH_TOKEN, then restart the dev server:\n\n` +
            `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}` +
            `</pre>`,
        { headers: { "Content-Type": "text/html" } },
    );
}
