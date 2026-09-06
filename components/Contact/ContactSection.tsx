import { cn } from "@/lib/utils";
import GithubContribution from "./GithubContribution";
import Block from "../ui/Block";

export default function ContactSection() {
    return (
        <section
            className="min-h-screen w-full bg-ink p-20 text-white"
            aria-label="Contact"
        >
            <Block
                className={cn(
                    "p-8 shadow-none",
                    "grid grid-cols-6 divide gap-x-2"
                )}
            >
                <GithubContribution className="col-span-4" />
                <div className="bg-red-200"> teart</div>
            </Block>
        </section>
    );
}
