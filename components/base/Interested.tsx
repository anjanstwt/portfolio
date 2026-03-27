import { IoIosMail } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { cn } from "@/lib/utils";

export default function Interested({ className }: { className?: string }) {
    return (
        <section className={cn("flex flex-col gap-y-6 pt-10", className)}>
            <div className="-mx-6 w-[calc(100%+3rem)] border-y border-neutral-800 bg-neutral-900/40 px-6 py-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Let&apos;s Connect</h2>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                    If you&apos;re interested in collaborating and building some cool things,
                    feel free to drop me a message on{" "}
                    <a
                        href="https://x.com/anjanstwt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                        <BsTwitterX className="size-3" /> Twitter
                    </a>{" "}
                    or send an{" "}
                    <a
                        href="mailto:anjansuman80@gmail.com"
                        className="inline-flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                        <IoIosMail className="size-4" /> Email
                    </a>
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
