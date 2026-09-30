"use client";

import { useRef } from "react";

/**
 * Plays/pauses a plain <audio> element on hover — works from the very
 * first hover, no prior click needed. Browsers always allow *muted*
 * playback without a user gesture; only audible autoplay is restricted.
 * So each hover starts playback muted, then unmutes once it's actually
 * running (unmuting an already-playing element needs no gesture either).
 * Pausing on mouseleave leaves `currentTime` where it was, so the next
 * hover resumes instead of restarting.
 */
export function useHoverAudio() {
    const audioRef = useRef<HTMLAudioElement>(null);

    return {
        audioRef,
        onMouseEnter: () => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.muted = true;
            audio
                .play()
                .then(() => {
                    audio.muted = false;
                })
                .catch((err) => {
                    console.error("[useHoverAudio] play() rejected:", err?.name, err?.message);
                });
        },
        onMouseLeave: () => {
            audioRef.current?.pause();
        },
    };
}
