"use client";

import { cn } from "cn";
import Block from "./Block/Block";
import { RxCross2 } from "react-icons/rx";
import { ReactNode } from "react";

interface DetailsPanelProps {
    heading: string;
    children: ReactNode;
    onClose: () => void;
    className?: string;
}

export default function DetailsPanel({
    heading,
    children,
    onClose,
    className,
}: DetailsPanelProps) {
    return (
        <div
            className={cn("bg-blade p-1 w-fit rounded-lg min-w-100 h-fit", className)}
        >
            <div className="px-2.5 py-1.75 text-xs text-neutral-100 flex justify-between items-center">
                <div>{heading}</div>
                <div
                    className="hover:bg-steel/10 p-1 transition-colors duration-300 ease-in-out rounded-[4px] cursor-pointer "
                    onClick={onClose}
                >
                    <RxCross2 className="text-steel size-4" />
                </div>
            </div>
            <Block className="rounded-md min-h-0 min-w-60 ">{children}</Block>
        </div>
    );
}
