"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

interface ToolTipProps {
    text: string;
    children: ReactNode;
    offsetX?: number;
    offsetY?: number;
    className?: string;
}

export default function ToolTip({
    text,
    children,
    offsetX = 17,
    offsetY = 30,
    className = "",
}: ToolTipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Ensures portal only renders on client
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setCoords({
            x: e.clientX + offsetX,
            y: e.clientY + offsetY,
        });
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={handleMouseMove}
        >
            {children}
            {mounted && visible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={`fixed z-[9999] pointer-events-none whitespace-nowrap bg-[#0f0f0f] text-[#D8CFBC] text-sm px-2 py-1 rounded shadow-md transition-opacity duration-200 ${roboto.className} ${className}`}
                        style={{ left: coords.x, top: coords.y }}
                    >
                        {text}
                    </div>,
                    document.body
                )
            }
        </div>
    );
}
