import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "@/components/home/block/Block";
import ParticleTemple from "@/components/showcase/particles/ParticleTemple";
import SVG from "@/components/icons/SVG";
import Safari from "@/components/ui/Safari";
import GithubActivityLine from "@/components/home/GithubActivityLine";
import CapsuleStack from "@/components/showcase/capsule-stack/CapsuleStack";
import { satisfy } from "@/lib/fonts";

export default function LinksGrid() {
    
    return (
        <div className="@container grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <a
                href="https://cal.com/anjanstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
            >
                <Block
                    left={
                        <SVG type="cal" className="rounded-[4px] p-[0.5px]" />
                    }
                    right={<FiArrowUpRight />}
                >
                    <div className="px-3.5 pb-3 text-fg">
                        <span className="text-mute">cal.com/</span>anjanstwt
                    </div>
                </Block>
            </a>

            <Block>
                <ParticleTemple className="size-full light:invert" />
            </Block>

            <Block
                left={
                    <Image
                        src="/images/pfp.png"
                        alt="profile"
                        height={18}
                        width={18}
                        className="rounded-xs "
                        unoptimized
                    />
                }
                className="col-span-2 w-full aspect-auto h-[calc(25cqw-0.75rem)] max-md:h-[calc(50cqw-0.5rem)]"
            >
                <div className="max-md:hidden contents">
                    <CapsuleStack label="Darwin" labelClassName={satisfy.className} />
                </div>

                {/* Below md: Malshej Ghat swaps in here instead. */}
                <div className="hidden max-md:contents">
                    <div className="px-3.5 py-3 text-xs min-[480px]:max-md:text-base">
                        <div className="text-fg ">Malshej Ghat</div>
                        <div>Pune, India</div>
                    </div>
                    <div className="absolute -right-12 bottom-0 h-44 w-80 rounded-tl-sm overflow-hidden">
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                            src="/video/video1.mp4"
                            poster="/gallery/img24.jpeg"
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                </div>
            </Block>
        </div>
    );
}
