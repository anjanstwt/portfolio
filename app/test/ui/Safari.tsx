'use client';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { GrRotateRight } from "react-icons/gr";
import { FiArrowDownCircle } from "react-icons/fi";
import { IoShareOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import AppleSideBarIcon from "./icons/AppleSideBarIcon";

const navigation = [
    "#EA595B",
    "#E5B916",
    "#34B855",
]

interface SafariBaseProps {
    url?: string,
    size?: string,
    className?: string,
}

interface SafariImageProps extends SafariBaseProps {
    src: string,
    alt: string,
    children?: never,
}

interface SafariChildrenProps extends SafariBaseProps {
    children: ReactNode,
}

type SafariProps = SafariImageProps | SafariChildrenProps;

const BASE_SIZE = 480;

export default function Safari({ url, size, className, ...contentProps }: SafariProps) {
    const numericSize = size ? parseFloat(size) : BASE_SIZE;
    const scale = numericSize / BASE_SIZE;
    const hasChildren = "children" in contentProps;

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentScale, setContentScale] = useState(1);

    useEffect(() => {
        if (!hasChildren) return;

        const updateContentScale = () => {
            if (!contentRef.current) return;
            setContentScale(contentRef.current.offsetWidth / window.innerWidth);
        };

        updateContentScale();
        window.addEventListener("resize", updateContentScale);
        return () => window.removeEventListener("resize", updateContentScale);
    }, [hasChildren, numericSize]);

    return (
        <div
            className={cn(
                "aspect-3/2 overflow-hidden select-none",
                "bg-ink rounded-md border border-neutral-700  ",
                className,
            )}
            style={{
                height: numericSize
            }}
        >

            {/* navbar */}
            <div className="h-[7%] w-full px-3 py-2 bg-[#1A1C1F] flex justify-between items-center gap-x-2 ">

                {/* left */}
                <div className="flex flex-1 justify-between items-center ">
                    <div className="flex justify-center items-center gap-x-4 ">
                        <div className="flex justify-center items-center gap-x-1.5 ">
                            {navigation.map((color, i) => (
                                <div
                                    key={i}
                                    className="rounded-full aspect-square "
                                    style={{
                                        backgroundColor: color,
                                        height: 8 * scale,
                                    }}
                                />
                            ))}
                        </div>
                        <AppleSideBarIcon
                            color="#e4e4e490"
                            size={20 * scale}
                        />
                        <div className="flex justify-center items-center -ml-2 ">
                            <ChevronLeft
                                size={18 * scale}
                                color="#e4e4e490"
                            />
                            <ChevronRight
                                size={18 * scale}
                                color="#e4e4e430"
                            />
                        </div>
                    </div>
                    <div>
                        <FaShieldAlt
                            size={11 * scale}
                            color="#e4e4e490"
                        />
                    </div>
                </div>

                {/* middle */}
                <div className="relative h-full flex-1 bg-cement rounded-xs flex justify-center items-center p-1 text-[#e4e4e490] ">
                    {url && (
                        <div
                            className="flex justify-center items-center gap-x-0.5 "
                            style={{ fontSize: 6 * scale }}
                        >
                            <IoLockClosed />
                            {url}
                        </div>
                    )}
                    <GrRotateRight
                        size={10 * scale}
                        className="-rotate-z-20 absolute right-1"
                    />
                </div>

                {/* right */}
                <div className="flex flex-1 justify-end items-center gap-x-2 text-[#e4e4e490] ">
                    <FiArrowDownCircle size={14 * scale} />
                    <IoShareOutline size={14 * scale} />
                    <FiPlus size={14 * scale} />
                    <IoCopyOutline size={13 * scale} />
                </div>
            </div>

            <div ref={contentRef} className="relative h-[93%] flex-1 overflow-hidden ">
                {"src" in contentProps ? (
                    <Image
                        src={contentProps.src}
                        alt={contentProps.alt}
                        fill
                        className="object-cover "
                    />
                ) : (
                    <div
                        className="absolute top-0 left-0 "
                        style={{
                            width: "100vw",
                            height: "100vh",
                            transform: `scale(${contentScale})`,
                            transformOrigin: "top left",
                        }}
                    >
                        {contentProps.children}
                    </div>
                )}
            </div>

        </div>
    )
}
