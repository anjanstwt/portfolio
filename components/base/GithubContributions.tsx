import { cn } from "@/lib/utils";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GithubContributions({ className }: { className?: string }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div className={cn(
            "w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] -mx-4 sm:-mx-6 py-8 border-b border-neutral-200 dark:border-neutral-800 flex justify-center items-center text-neutral-700 dark:text-neutral-300",
            className
        )}>
            <div className="w-full overflow-x-auto px-4 sm:px-6 hide-scrollbar flex justify-center">
                {mounted ? (
                    <GitHubCalendar
                        username={'anjanstwt'}
                        blockSize={9}
                        blockMargin={3}
                        fontSize={10}
                        colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                        theme={{
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
                        }}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                        }}
                    />
                ) : (
                    <div className="w-full h-[150px] animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-md" />
                )}
            </div>
        </div>
    );
}