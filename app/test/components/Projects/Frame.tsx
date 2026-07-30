import { cn } from "@/lib/utils";
import Image from "next/image";

interface FrameProps {
    src: string,
    alt: string,
    className?: string,
    size?: number,
}

export default function Frame({ src, alt, className, size }: FrameProps) {
    return (
        <div
            className={cn(
                "bg-ink border border-primary-light/40 p-1 rounded-lg",
                "aspect-video ",
                className,
            )}
            style={{
                height: size,
            }}
        >
            <div className="relative h-full w-full border border-primary-light/40 rounded-md">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    )
}