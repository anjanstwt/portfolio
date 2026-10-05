import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import BlockHeader from "./BlockHeader";

interface BlockProps extends Omit<
    ComponentPropsWithoutRef<"div">,
    "className" | "children"
> {
    left?: ReactNode;
    right?: ReactNode;
    className?: string;
    headerClassName?: string;
    children?: ReactNode;
}

export default function Block({
    left,
    right,
    className,
    headerClassName,
    children,
    ...props
}: BlockProps) {
    return (
        <div
            {...props}
            className={cn(
                "group",
                "w-full aspect-square",
                "box-border flex flex-col",
                "justify-between items-start",
                "relative overflow-hidden",
                "rounded-3xl max-[480px]:rounded-xl",
                "border-t-[0.5px] border-t-edge",
                "bg-block",
                "shadow-[0_0_0_1px_var(--t-ring),0_1px_2px_0_var(--t-shadow)]",
                className,
            )}
        >
            {(left || right) && (
                <BlockHeader
                    left={left}
                    right={right}
                    className={cn("relative z-10", headerClassName)}
                    padding
                />
            )}
            {children}
        </div>
    );
}
