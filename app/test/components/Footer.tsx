import { cn } from "@/lib/utils";
import Block from "./Block";
import Safari from "./Safari";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn("w-full flex flex-col gap-6", className)}>
            <Block>
                <Safari url="anjansuman.dev/test">
                    <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
                        <p className="text-sm text-neutral-300">Preview</p>
                        <p className="text-xs text-neutral-500">
                            A quick look at what&apos;s being tested here.
                        </p>
                    </div>
                </Safari>
            </Block>

            <Block className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 sm:flex-row">
                <p>&copy; {new Date().getFullYear()} Anjan Suman</p>
                <p className="text-neutral-600">/test</p>
            </Block>
        </footer>
    );
}
