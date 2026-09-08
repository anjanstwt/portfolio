import { cn } from "@/lib/utils";
import GithubContribution from "./GithubContribution";
import ContactLinks from "./ContactLinks";
import Block from "../ui/Block";

export default function ContactSection() {
    return (
        <section
            className="min-h-screen w-full bg-ink p-20 text-white flex items-center justify-center"
            aria-label="Contact"
        >
            <Block
                className={cn(
                    "p-8 shadow-none w-full max-w-5xl",
                    "grid grid-cols-1 lg:grid-cols-6 gap-6"
                )}
            >
                <GithubContribution className="lg:col-span-4" />
                <ContactLinks className="lg:col-span-2" />
            </Block>
        </section>
    );
}
