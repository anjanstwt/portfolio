import { cn } from "@/lib/utils";

interface BlockProps {
    variant?: "default" | "gradient";
    className?: string;
    children?: React.ReactNode;
    shineY?: number;
}

export default function Block({ variant, className, children, shineY }: BlockProps) {
    return (
        <div
            className={cn(
                "flex justify-center items-center ",
                "bg-cement/10 backdrop-blur-md text-white rounded-[44px] border border-primary-light/10 ",
                "relative shadow-2xl",
                variant === "gradient" && "bg-linear-to-br from-primary-light/5 to-transparent backdrop-blur-none ",
                className,
            )}
        >
            <span className={cn(
                "absolute inset-x-8 top-0 h-[0.5px] bg-linear-to-r from-transparent via-primary-light/70 to-transparent ",
            )}
                style={{
                    top: shineY
                }}
            />
            {children}
        </div>
    )
}