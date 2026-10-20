import { FiHeart, FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Block from "@/components/home/block/Block";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="mt-12 pt-8 border-t border-t-edge">
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4">
                <Block className="col-span-2">
                    <div className="px-3.5 py-3 h-full flex flex-col justify-between">
                        <div>
                            <div className="text-fg font-medium mb-2">
                                Designed & Built
                            </div>
                            <div className="text-mute text-sm">
                                with passion and precision
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-mute mt-4">
                            <span>Made with</span>
                            <FiHeart className="text-red-500" />
                            <span>by anjanstwt</span>
                        </div>
                    </div>
                </Block>

                <Block>
                    <div className="px-3.5 py-3 h-full flex flex-col justify-center">
                        <div className="text-fg font-medium mb-2 text-sm">
                            Social
                        </div>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/anjanstwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mute hover:text-fg transition-colors"
                            >
                                <FaGithub className="size-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/anjanstwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mute hover:text-fg transition-colors"
                            >
                                <FaLinkedinIn className="size-5" />
                            </a>
                            <a
                                href="https://x.com/anjanstwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mute hover:text-fg transition-colors"
                            >
                                <RiTwitterXLine className="size-5" />
                            </a>
                        </div>
                    </div>
                </Block>

                <Block
                    right={<FiArrowUp />}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="px-3.5 py-3 h-full flex flex-col justify-center">
                        <div className="text-fg font-medium mb-1 text-sm">
                            Back to Top
                        </div>
                        <div className="text-mute text-xs">
                            Scroll up
                        </div>
                    </div>
                </Block>

                <Block className="col-span-4">
                    <div className="px-3.5 py-3 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-mute">
                        <div>
                            © {currentYear} anjanstwt. All rights reserved.
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/anjanstwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-fg transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/anjanstwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-fg transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://x.com/anjanstwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-fg transition-colors"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                </Block>
            </div>
        </div>
    );
}