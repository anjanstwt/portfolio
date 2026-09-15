const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

function basicAuthHeader() {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!id || !secret) {
        throw new Error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET env vars");
    }
    return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

async function getAccessToken() {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    if (!refreshToken) {
        throw new Error("Missing SPOTIFY_REFRESH_TOKEN env var");
    }

    const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: basicAuthHeader(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Spotify token refresh failed: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as { access_token: string };
    return data.access_token;
}

export interface NowPlaying {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    albumArt?: string;
    songUrl?: string;
    progressMs?: number;
    durationMs?: number;
}

const NOT_PLAYING: NowPlaying = { isPlaying: false };

export async function getNowPlaying(): Promise<NowPlaying> {
    const accessToken = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
    });

    // 204 = nothing playing right now; anything >=400 we treat the same way.
    if (res.status === 204 || res.status >= 400) {
        return NOT_PLAYING;
    }

    const data = await res.json();

    if (!data?.item) {
        return NOT_PLAYING;
    }

    return {
        isPlaying: Boolean(data.is_playing),
        title: data.item.name,
        artist: data.item.artists?.map((a: { name: string }) => a.name).join(", "),
        albumArt: data.item.album?.images?.[0]?.url,
        songUrl: data.item.external_urls?.spotify,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
    };
}
