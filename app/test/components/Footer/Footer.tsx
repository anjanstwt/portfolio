'use client';

import { cn } from "@/lib/utils";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Safari from "../../ui/Safari";
import Block from "../../ui/Block";
import Clock from "../../ui/icons/Clock";
import user from "../../data/user.data";

const socials = [
    { label: "Github", href: "https://github.com/Anjansuman", icon: FaGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anjansuman", icon: FaLinkedin },
    { label: "Email", href: "mailto:hello@anjansuman.dev", icon: Mail },
];

export default function Footer() {
    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center gap-y-16 px-6 py-24 ">
            <div
                className={cn(
                    "text-5xl sm:text-7xl font-black text-center text-shadow-md ",
                    "bg-linear-to-b from-primary-light/20 to-transparent bg-clip-text text-transparent ",
                )}
            >
                {"Let's talk, " + user.name}
            </div>

            <Safari url="anjansuman.dev/contact" size="420" className="w-full max-w-2xl">
                <div className="h-full w-full flex flex-col justify-center items-center gap-y-10 bg-ink ">
                    <Clock size={90} />
                    <div className="flex gap-x-6 ">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <Block key={label} className="h-14 w-14 rounded-2xl ">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-full w-full items-center justify-center text-primary-light/70 hover:text-primary-light transition-colors "
                                >
                                    <Icon size={20} />
                                </a>
                            </Block>
                        ))}
                    </div>
                </div>
            </Safari>

            <Block
                variant="gradient"
                className="w-full max-w-3xl h-16 px-8 justify-between text-sm text-primary-light/50 "
            >
                <span>&copy; {new Date().getFullYear()} {user.name}</span>
                <a
                    href="mailto:hello@anjansuman.dev"
                    className="flex items-center gap-x-1 hover:text-primary-light transition-colors "
                >
                    Get in touch <ArrowUpRight size={14} />
                </a>
            </Block>
        </section>
    );
}
