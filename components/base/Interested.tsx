import { IoIosMail } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { cn } from "@/lib/utils";

export default function Interested({ className }: { className?: string }) {
    return (
        <div className={cn(
            "flex flex-col gap-y-6",
            className,
        )}>
            <p className="text-sm text-neutral-500 leading-relaxed">
                If you&apos;re interested in collaborating and building some cool things,
                feel free to dm me on{" "}
                <a
                    href="https://x.com/anjanstwt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 "
                >
                    <BsTwitterX className="size-3 text-neutral-500 hover:text-neutral-200 transition" />
                </a>{" "}
                or drop me an{" "}
                <a
                    href="mailto:anjansuman80@gmail.com"
                    className="inline-flex items-center gap-1 "
                >
                    <IoIosMail className="size-4 text-neutral-500 hover:text-neutral-200 transition" />
                </a>
                . I’ll get back to you within 2 business days. I’m always open to new ideas
                and projects!
            </p>
            <p className="text-neutral-400 text-sm">
                built and maintained by {" "}
                <a
                    target="_blank"
                    href="https://x.com/AnjanSuman8"
                    className="underline font-semibold text-neutral-300 "
                >
                    anjan
                </a>
            </p>
        </div>
    );
}
