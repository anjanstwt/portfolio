import { NextResponse } from "next/server";

// One-time setup route: visit /api/spotify/login yourself (from an origin
// that matches one of the Redirect URIs registered on the Spotify app —
// Spotify no longer accepts bare "localhost", use 127.0.0.1 or a real host),
// log into Spotify, approve access, and you'll land on /callback with a
// refresh token to copy into .env.local. Not linked from anywhere in the UI.
export async function GET(request: Request) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    if (!clientId) {
        return NextResponse.json(
            { error: "Missing SPOTIFY_CLIENT_ID env var" },
            { status: 500 },
        );
    }

    const redirectUri = new URL("/callback", request.url).toString();

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: "user-read-currently-playing user-read-playback-state",
    });

    const authorizeUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    // Shown instead of an immediate redirect so a redirect_uri mismatch can
    // be diagnosed by eye — compare this string byte-for-byte against the
    // Spotify app's saved Redirect URIs list.
    return new NextResponse(
        `<pre style="font-family:monospace;white-space:pre-wrap;padding:24px;background:#0c0c0c;color:#eee;">` +
            `redirect_uri being sent to Spotify:\n${redirectUri}\n\n` +
            `This exact string (scheme + host + port + path, no trailing slash) must be in your ` +
            `Spotify app's Redirect URIs list — and the list must have been saved.\n\n` +
            `<a style="color:#1ED760" href="${authorizeUrl}">Continue to Spotify -&gt;</a>` +
            `</pre>`,
        { headers: { "Content-Type": "text/html" } },
    );
}
