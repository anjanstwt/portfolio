import Link from "next/link";
import { cn } from "@/lib/utils";
import Block from "../../ui/Block";
import footerLinks from "../../data/footer.data";


export default function SocialLinks() {
    return (
        <div className="flex flex-wrap justify-center items-center gap-3 ">
            {footerLinks.map(({ label, handle, link, icon: Icon }) => (
                <Link
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contents"
                >
                    <Block
                        className={cn(
                            "bg-ink gap-x-2 px-5 py-2 rounded-full shadow-lg ",
                            "text-sm text-primary-light/60 hover:text-primary-light transition-colors ",
                        )}
                    >
                        <Icon size={16} />
                        {handle}
                    </Block>
                </Link>
            ))}
        </div>
    );
}
