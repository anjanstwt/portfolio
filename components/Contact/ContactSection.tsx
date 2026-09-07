import { cn } from "@/lib/utils";
import GithubContribution from "./GithubContribution";
import ContactCard from "./ContactCard";
import Block from "../ui/Block";

export default function ContactSection() {
    return (
        <section
            className="flex min-h-screen w-full items-center bg-ink p-10 text-white sm:p-20"
            aria-label="Contact"
        >
            <Block
                className={cn(
                    "w-full p-8 shadow-none",
                    "grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-x-6",
                )}
            >
                <GithubContribution className="md:col-span-4" />
                <div className="md:col-span-2 md:border-l md:border-primary-light/10 md:pl-6">
                    <ContactCard />
                </div>
            </Block>
        </section>
    );
}
