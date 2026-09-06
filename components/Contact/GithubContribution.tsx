"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface GithubContributionProps {
    className?: string;
}

export default function GithubContribution({
    className,
}: GithubContributionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div
            className={cn(
                "w-full flex justify-start items-start text-neutral-300",
                className,
            )}
        >
            <div className="w-full overflow-x-auto hide-scrollbar flex justify-center">
                {mounted ? (
                    <GitHubCalendar
                        username={"anjanstwt"}
                        blockSize={10}
                        blockMargin={4}
                        fontSize={11}
                        colorScheme="dark"
                        theme={{
                            dark: [
                                "#161b22",
                                "#0e4429",
                                "#006d32",
                                "#26a641",
                                "#39d353",
                            ],
                        }}
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                        }}
                    />
                ) : (
                    <div className="w-full h-37.5 animate-pulse bg-neutral-900 rounded-md" />
                )}
            </div>
        </div>
    );
}
