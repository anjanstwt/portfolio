import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "../Block/Block";
import SVG from "../../icons/SVG";

export default function AboutGrid() {
    return (
        <div className="grid grid-cols-4 grid-rows-1 gap-4 ">
            <Block
                left={
                    <Image
                        src="/images/pfp.png"
                        alt="profile"
                        height={16}
                        width={16}
                        className="rounded-xs "
                        unoptimized
                    />
                }
                className="col-span-2"
            >
                <div className="px-3.5 py-3 text-xs">
                    <div className="text-neutral-100 ">Malshej Ghat</div>
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
            </Block>

            <a href="/projects/winterfell" className="contents">
                <Block
                    left={
                        <SVG
                            type="winterfell"
                            className="bg-[#6c44fc] rounded-[4px] p-[0.75px] "
                            color="white"
                        />
                    }
                    right={<FiArrowUpRight className="text-blade " />}
                >
                    <Image
                        src="/gallery/img33.jpeg"
                        alt="Winterfell"
                        fill
                        className="rounded-3xl object-cover"
                    />
                    <div
                        className={[
                            "relative z-10 min-w-full px-3.5 pb-3 ",
                            "backdrop-blur-[1px]",
                            "[mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                            "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                        ].join(" ")}
                    >
                        <div className="text-blade ">Winterfell</div>
                        <div className="text-steel">
                            AI-built Solana contracts
                        </div>
                    </div>
                </Block>
            </a>
            <a href="nocturn.anjan.site" target="_blank" className="contents">
                <Block
                    left={
                        <SVG
                            type="nocturn"
                            className="bg-blade rounded-[4px] p-0.5 "
                            color="white"
                        />
                    }
                    right={<FiArrowUpRight className="text-blade " />}
                >
                    <Image
                        src="/gallery/img33.png"
                        alt="Winterfell"
                        fill
                        className="rounded-3xl object-cover object-[center_5%]"
                    />
                    <div
                        className={[
                            "relative z-10 min-w-full px-3.5 pb-3 ",
                            "backdrop-blur-[1px]",
                            "[mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                            "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]",
                        ].join(" ")}
                    >
                        <div className="text-blade ">Nocturn</div>
                        <div className="text-steel">
                            zero trust quiz platform
                        </div>
                    </div>
                </Block>
            </a>
        </div>
    );
}
