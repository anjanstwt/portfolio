"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@/hooks/useTheme";

interface GithubContributionProps {
    className?: string;
}

// Level-0 matches the Block surface in each theme so empty days disappear
// into the card instead of reading as a grey grid.
const CALENDAR_THEME = {
    dark: ["#171717", "#0e4429", "#006d32", "#26a641", "#39d353"],
    light: ["#f0efec", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

export default function GithubContribution({
    className,
}: GithubContributionProps) {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => setMounted(true), []);

    return (
        <div
            className={cn(
                "w-full flex justify-start items-start text-mute",
                className,
            )}
        >
            <div className="w-full overflow-x-auto hide-scrollbar flex justify-center">
                {mounted ? (
                    <GitHubCalendar
                        username={"anjanstwt"}
                        blockSize={8}
                        blockMargin={3}
                        fontSize={0}
                        colorScheme={theme}
                        theme={CALENDAR_THEME}
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                        }}
                    />
                ) : (
                    <div className="w-full h-37.5 animate-pulse bg-fg/5 rounded-md" />
                )}
            </div>
        </div>
    );
}
