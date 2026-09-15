import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Block from "../Block/Block";
import SVG from "../../icons/SVG";
import RingSection from "@/components/Ring/RingSection";
import { HiArrowSmallDown, HiArrowSmallRight } from "react-icons/hi2";

export default function HobbyGrid() {
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
                    <div className="text-neutral-100 flex justify-center items-center gap-x-1 text-xs ">
                        <span>Experience</span>
                        <HiArrowSmallRight className="size-3.5 transition-transform group-hover:translate-x-1 " />
                    </div>
                    <div className="text-xs">I have</div>
                </div>
                <div className="absolute -right-3 -bottom-6 h-44 w-44 rounded-tl-sm overflow-hidden">
                    <Image
                        src="/gallery/boy.jpeg"
                        alt={"infrastructure"}
                        className="w-full h-full object-cover -translate-x-3 "
                        fill
                        unoptimized
                    />
                    {/*<HalftoneSection className="relative h-150 w-100 " />*/}
                </div>
            </Block>

            <a href="https://spiderskill.com" target="_blank" className="contents">
                <Block
                    left={
                        <SVG
                            type="winterfell"
                            className="size-4 bg-[#6c44fc] rounded-xs p-px "
                            color="white"
                        />
                    }
                    right={<FiArrowUpRight className="text-neutral-100" />}
                >
                    <div className="absolute bottom-0 px-3.5 py-3 text-xs">
                        <div className="text-neutral-100">SpiderSkill</div>
                        <div>founding engineer</div>
                    </div>
                    <Image
                        src="/experience/spiderskill/imac.png"
                        alt="Winterfell"
                        className="relative -right-20 -top-3"
                        width={300}
                        height={300}
                        unoptimized
                    />
                </Block>
            </a>
            <a href="" className="contents">
                <Block
                    left={
                        <SVG
                            type="winterfell"
                            className="size-4 bg-[#6c44fc] rounded-xs p-px "
                            color="white"
                        />
                    }
                    right={<FiArrowUpRight className="text-neutral-100" />}
                >
                    <div className="absolute bottom-0 px-3.5 py-3 text-xs">
                        <div className="text-neutral-100">Wallpaper Heaven</div>
                        <div>swe intern</div>
                    </div>
                    <Image
                        src="/experience/wallpaper-heaven/imac.png"
                        alt="Winterfell"
                        className="relative -right-20 -top-3"
                        width={300}
                        height={300}
                        unoptimized
                    />
                </Block>
            </a>
        </div>
    );
}
