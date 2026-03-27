import { cn } from "@/lib/utils";
import { details } from "../data/details";
import { DetailType } from "../types/details-type";
import SectionHeading from "../ui/SectionHeading";

export default function Interested({ className }: { className?: string }) {
    const twitter = details.find(d => d.type === DetailType.X);
    const email = details.find(d => d.type === DetailType.EMAIL);

    return (
        <section className={cn("flex flex-col gap-y-4 pt-4", className)}>
            <SectionHeading title="Let's Connect" />
            <div className="flex flex-col gap-4 mt-2">
                <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                    If you&apos;re interested in collaborating and building some cool things,
                    feel free to drop me a message on{" "}
                    {twitter && (
                        <a
                            href={twitter.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                            <twitter.logo className="size-3" /> {twitter.label}
                        </a>
                    )}
                    {twitter && email && " or send an "}
                    {email && (
                        <a
                            href={email.link}
                            className="inline-flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                            <email.logo className="size-4" /> {email.label}
                        </a>
                    )}
                    . I’ll get back to you within 2 business days. I’m always open to new ideas
                    and projects!
                </p>
            </div>
            
            <p className="text-neutral-500 text-xs">
                built and maintained by {" "}
                <a
                    target="_blank"
                    href="https://x.com/AnjanSuman8"
                    className="font-medium hover:text-neutral-300 transition-colors"
                >
                    anjan
                </a>
            </p>
        </section>
    );
}
