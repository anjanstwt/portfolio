'use client';

import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';

export default function ScrollHUD() {
    const { scrollYProgress } = useScroll();
    const [percent, setPercent] = useState(0);
    const [top, setTop] = useState(0);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setPercent(Math.round(v * 100));
        setTop(Math.round(window.scrollY));
    });

    return (
        <div className="fixed inset-0 z-20 pointer-events-none font-mono text-[10px] text-neutral-500">
            <span className="absolute top-6 right-6">{percent}%</span>
            <span className="absolute bottom-6 left-6 [writing-mode:vertical-rl]">
                TOP: {top} PX
            </span>
        </div>
    );
}
