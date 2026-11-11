import Block from "@/components/home/block/Block";
import user from "@/data/user.data";
import { ContactKind } from "@/types/user.type";

const contactLabels: Record<ContactKind, string> = {
    email: "Email",
    x: "X / Twitter",
    linkedin: "LinkedIn",
    github: "GitHub",
    resume: "Resume",
};

const linkClassName =
    "inline-block rounded-sm py-1 hover:text-fg focus-visible:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-safe:transition-colors motion-safe:duration-200";

export default function Footer() {
    return (
        <footer className="grid grid-cols-1 gap-4 pb-16 md:grid-cols-2">
            <Block className="aspect-auto gap-8 p-6 md:col-span-2 md:p-8">
                <p>Thanks for stopping by.</p>
                <h2 className="text-[clamp(2rem,8vw,6rem)] leading-none font-medium tracking-tight text-fg">
                    {user.name}
                </h2>
            </Block>

            <Block className="aspect-auto justify-start gap-4 p-6 md:p-8">
                <h2 className="text-fg">Get in touch</h2>
                <ul>
                    {user.contacts.map((contact) => (
                        <li key={contact.kind}>
                            <a
                                href={contact.href}
                                target={contact.href.startsWith("https://") ? "_blank" : undefined}
                                rel={contact.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                                className={linkClassName}
                            >
                                {contactLabels[contact.kind]}
                            </a>
                        </li>
                    ))}
                </ul>
            </Block>

            <Block className="aspect-auto justify-start gap-4 p-6 md:p-8">
                <h2 id="footer-explore" className="text-fg">Explore</h2>
                <nav aria-labelledby="footer-explore">
                    <ul>
                        <li>
                            <a href="/assets" className={linkClassName}>Assets</a>
                        </li>
                        <li>
                            <a href="/stacks" className={linkClassName}>Stacks</a>
                        </li>
                    </ul>
                </nav>
            </Block>
        </footer>
    );
}
