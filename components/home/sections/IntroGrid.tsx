import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { TbLocationFilled } from "react-icons/tb";
import Block from "@/components/home/block/Block";
import { Globe } from "@/components/ui/globe";
import India from "@/components/icons/India";
import CopyIconButton from "@/components/ui/CopyIconButton";
import { FiMail } from "react-icons/fi";
import ExpandableBlock from "@/components/ui/ExpandableBlock";
import HeightNote from "@/components/home/annotations/HeightNote";

export default function IntroGrid() {
    return (
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 ">
            <HeightNote>
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
                    <div className="px-3.5 pb-3 text-fg">
                        Engineer by trade, builder by obsession.
                    </div>
                </Block>
            </HeightNote>

            <Block
                left={<TbLocationFilled />}
                right={<India className="size-4 " />}
            >
                <Globe className="top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 h-70 z-0 light:invert" />
                <div
                    className={[
                        "relative z-10 min-w-full px-3.5 pb-3",
                        "backdrop-blur-[1px]",
                        "[mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]",
                        "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]",
                    ].join(" ")}
                >
                    <div className="text-fg">Kolkata, India</div>
                    <div>15° Patchy rain nearby</div>
                </div>
            </Block>

            <ExpandableBlock className="col-span-2 row-span-2">
                <Block>
                    <Image
                        src="/gallery/img16.jpeg"
                        alt="landscape"
                        fill
                        className="rounded-3xl object-cover"
                    />
                </Block>
            </ExpandableBlock>

            <ExpandableBlock>
                <Block>
                    <Image
                        src="/gallery/img29.jpg"
                        alt="landscape"
                        fill
                        className="rounded-3xl object-cover "
                    />
                </Block>
            </ExpandableBlock>

            <Block
                left={<FiMail className="size-4" />}
                right={<CopyIconButton text="@anjanstwt" />}
            >
                <div className="px-3.5 pb-3 text-xs min-[480px]:max-md:text-base ">
                    <div className="text-mute">anjansuman80</div>
                    <div className="text-fg">@gmail.com</div>
                </div>
            </Block>
        </div>
    );
}
