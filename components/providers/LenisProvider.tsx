"use client";

import { ReactLenis } from 'lenis/react';
import { scrollSpeed } from '@/lib/lenisScrollSpeed';

interface LenisProviderProps {
    children: React.ReactNode;
}

// Caps how far a single wheel/trackpad event can push the scroll target.
// Lenis's lerp only smooths the transition toward wherever raw input lands —
// a hard flick still lands far away, so the eased catch-up still reads as
// fast. Clamping the input itself is what makes a frantic flick settle into
// the same slow glide as a gentle one (this is measured post-wheelMultiplier,
// in the same px units Lenis scrolls in).
const MAX_WHEEL_DELTA = 70;

export default function LenisProvider({ children }: LenisProviderProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.06,
                smoothWheel: true,
                wheelMultiplier: 0.85,
                touchMultiplier: 1.4,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                autoRaf: true,
                virtualScroll: (data) => {
                    const clamped = Math.sign(data.deltaY) * Math.min(Math.abs(data.deltaY), MAX_WHEEL_DELTA);
                    data.deltaY = clamped * scrollSpeed.factor;
                    return true;
                },
            }}
        >
            {children}
        </ReactLenis>
    );
}
