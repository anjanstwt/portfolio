import { cn } from "@/lib/utils";
import Block from "../../ui/Block";
import Safari from "../../ui/Safari";
import Clock from "../../ui/icons/Clock";
import user from "../../data/user.data";
import FooterPreview from "./FooterPreview";
import SocialLinks from "./SocialLinks";

const SAFARI_SIZE = "420";

export default function Footer() {
    return (
        <footer className="min-h-screen w-full p-10 flex justify-center items-center ">
            <Block className="h-full w-full p-2 flex-col gap-y-2 ">
                <Block
                    variant={"gradient"}
                    className="w-full flex-col gap-y-8 p-10 rounded-[36px] "
                >
                    <Safari
                        url={"anjan.dev/contact"}
                        size={SAFARI_SIZE}
                        className="shadow-2xl "
                    >
                        <FooterPreview />
                    </Safari>
                    <SocialLinks />
                </Block>

                <div
                    className={cn(
                        "w-full flex justify-between items-center gap-x-4 px-8 py-4 ",
                        "text-sm text-primary-light/40 ",
                    )}
                >
                    <span>{`© ${new Date().getFullYear()} ${user.name}`}</span>
                    <div className="relative size-10 overflow-hidden ">
                        <Clock size={40} />
                    </div>
                    <span>Built with Next.js</span>
                </div>
            </Block>
        </footer>
    );
}
