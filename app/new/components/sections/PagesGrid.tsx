
import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { TbLocationFilled } from "react-icons/tb";
import Block from "../Block/Block";
import { Globe } from "../ui/globe";
import India from "../../icons/India";
import CopyIconButton from "../CopyIconButton";

export default function PagesGrid() {
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 ">
            <Block className="col-span-2 row-span-2">
                <Image
                    src="/gallery/scratchingcat.jpeg"
                    alt="landscape"
                    fill
                    className="rounded-3xl object-cover"
                />
            </Block>
            <Block
                left={<CgMenuGridO />}
                right={
                    <Image
                        src="/images/pfp.png"
                        alt="anjan"
                        width={24}
                        height={24}
                        className="rounded-full"
                        unoptimized
                    />
                }
            >
                <div className="px-3.5 pb-3 text-neutral-100">
                    Designer turned creator, based in Vienna, Austria. Currently
                    building my next solo venture.
                </div>
            </Block>

            <Block
                left={<TbLocationFilled />}
                right={<India className="size-4 " />}
            >
                <Globe className="top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 h-70 z-0" />
                <div
                    className={[
                        "relative z-10 min-w-full px-3.5 pb-3",
                        "backdrop-blur-[1px]",
                        "[mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]",
                        "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]",
                    ].join(" ")}
                >
                    <div className="text-neutral-100">Kolkata, India</div>
                    <div>15° Patchy rain nearby</div>
                </div>
            </Block>

            <Block>
                <Image
                    src="/gallery/img29.jpg"
                    alt="landscape"
                    fill
                    className="rounded-3xl object-cover"
                />
            </Block>

            <Block
                left={<CgMenuGridO />}
                right={<CopyIconButton text="@anjanstwt" />}
            >
                <div className="px-3.5 pb-3">
                    <div className="text-steel">Twitter / X</div>
                    <div className="text-neutral-100">@anjanstwt</div>
                </div>
            </Block>
        </div>
    );
}
