import Link from "next/link";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Block from "../../ui/Block";
import type { SocialLabel, SocialType } from "../../types/footer.type";

const ICONS: Record<SocialLabel, IconType> = {
    GitHub: FiGithub,
    X: FaXTwitter,
    LinkedIn: FaLinkedinIn,
};

interface SocialLinksProps {
    socials: SocialType[];
    className?: string;
}

export default function SocialLinks({ socials, className }: SocialLinksProps) {
    return (
        <div className={cn("flex items-center gap-x-3 ", className)}>
            {socials.map(({ label, href }) => {
                const Icon = ICONS[label];

                return (
                    <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="contents"
                    >
                        <Block
                            className={cn(
                                "bg-ink px-5 py-2 gap-x-2 rounded-full shadow-lg ",
                                "text-sm text-primary-light/60 hover:text-primary-light/90 transition-colors ",
                            )}
                        >
                            <Icon size={16} />
                            {label}
                        </Block>
                    </Link>
                );
            })}
        </div>
    );
}
