import { cn } from "@/lib/utils";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubContributions({ className }: { className?: string }) {
    return (
        <div className={cn(
            "w-[calc(100%+3rem)] -mx-6 py-8 border-b border-neutral-800 flex justify-center items-center text-neutral-300",
            className
        )}>
            <div className="w-full overflow-x-auto px-6 hide-scrollbar flex justify-center">
                <GitHubCalendar
                    username={'anjanstwt'}
                    blockSize={9}
                    blockMargin={3}
                    fontSize={10}
                    colorScheme={'dark'}
                    theme={{
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                    }}
                />
            </div>
        </div>
    );
}