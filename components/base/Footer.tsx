import { IoIosMail } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import ToolTipComponent from "../ui/TooltipComponent";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn(
            "w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 pt-8 pb-4 border-t border-neutral-800 text-sm text-neutral-500",
            className,
        )}>
            <div>&copy; {new Date().getFullYear()} Anjan Suman</div>
            <SocialLinks />
        </footer>
    );
}

type SocialLink = {
    href: string;
    label: string;
    Icon: React.ElementType;
    tooltip: string;
    size: number;
};

const socialLinks: SocialLink[] = [
    {
        href: "https://x.com/anjanstwt",
        label: "X",
        Icon: BsTwitterX,
        tooltip: 'anjanstwt',
        size: 14,
    },
    {
        href: "https://github.com/anjanstwt",
        label: "GITHUB",
        Icon: IoLogoGithub,
        tooltip: 'anjanstwt',
        size: 16,
    },
    {
        href: "https://linkedin.com/in/anjanstwt",
        label: "LINKEDIN",
        Icon: FaLinkedinIn,
        tooltip: 'anjanstwt',
        size: 16,
    },
    {
        href: "mailto:anjansuman80@gmail.com",
        label: "MAIL",
        Icon: IoIosMail,
        tooltip: 'anjansuman80@gmail.com',
        size: 19,
    },
    {
        href: 'https://drive.google.com/file/d/1Ob9gU4n7ijha1h9E0EkYd64bvLzK0ceX/view?usp=drive_link',
        label: "RESUME",
        Icon: FaFileLines,
        tooltip: 'resume',
        size: 14,
    }
];

function SocialLinks() {
    return (
        <div className={cn(
            "flex items-center gap-3 text-neutral-300",
        )}
        >
            {socialLinks.map(({ href, label, Icon, tooltip, size }) => (
                <ToolTipComponent
                    key={tooltip}
                    content={tooltip}
                >
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="hover:text-neutral-100 transition-colors"
                    >
                        <Icon size={size} />
                    </a>
                </ToolTipComponent>
            ))}
        </div>
    );
}

