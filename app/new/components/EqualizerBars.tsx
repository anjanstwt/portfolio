import { cn } from "@/lib/utils";

const BAR_DELAYS = ["0s", "0.15s", "0.3s", "0.45s"];

interface EqualizerBarsProps {
    className?: string;
}

// Paused by default; only plays while an ancestor with `group` is hovered
// (e.g. the surrounding <Block>). Uses the `eq-bar` keyframe from globals.css.
export default function EqualizerBars({ className }: EqualizerBarsProps) {
    return (
        <div className={cn("flex items-end gap-0.5 h-3.5", className)}>
            {BAR_DELAYS.map((delay) => (
                <span
                    key={delay}
                    className={cn(
                        "w-0.5 h-full bg-current rounded-full origin-bottom",
                        "[animation:eq-bar_0.9s_ease-in-out_infinite]",
                        "[animation-play-state:paused]",
                        "group-hover:[animation-play-state:running]",
                    )}
                    style={{ animationDelay: delay }}
                />
            ))}
        </div>
    );
}
