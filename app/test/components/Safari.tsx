import { cn } from "@/lib/utils";

interface SafariProps {
    url: string;
    className?: string;
    children: React.ReactNode;
}

const TRAFFIC_LIGHTS = ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"];

/**
 * A Safari-style browser frame: title bar with traffic lights and an address
 * pill, wrapping arbitrary content as the viewport.
 */
export default function Safari({ url, className, children }: SafariProps) {
    return (
        <div
            className={cn(
                "w-full overflow-hidden rounded-xl border border-primary-light/15 bg-night/60",
                "shadow-[0_-2px_4px_1px_rgba(228,228,228,0.04),0_2px_16px_1px_#000]",
                className,
            )}
        >
            <div className="flex items-center gap-x-3 border-b border-primary-light/10 bg-linear-to-r from-grub to-night/70 px-4 py-2.5">
                <div className="flex items-center gap-x-2">
                    {TRAFFIC_LIGHTS.map((color) => (
                        <span key={color} className={cn("size-3 rounded-full", color)} />
                    ))}
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="max-w-64 w-full truncate rounded-md bg-ink/60 px-3 py-1 text-center text-[11px] text-primary-light/50">
                        {url}
                    </div>
                </div>

                {/* Balances the traffic lights so the address pill stays centred. */}
                <div className="w-14" aria-hidden />
            </div>

            <div className="bg-stale">{children}</div>
        </div>
    );
}
