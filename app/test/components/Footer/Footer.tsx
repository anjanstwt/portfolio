import { cn } from "@/lib/utils";
import Block from "../../ui/Block";
import Clock from "../../ui/icons/Clock";
import footer from "../../data/footer.data";
import user from "../../data/user.data";
import PreviewWindow from "./PreviewWindow";
import SocialLinks from "./SocialLinks";

export default function Footer() {
    return (
        <footer className="min-h-screen w-full p-10 flex justify-center items-center ">
            <Block className="h-[calc(100vh-5rem)] w-full p-2 ">
                <Block
                    className="h-full w-full rounded-[36px] p-10 flex flex-col justify-between overflow-hidden "
                    variant={"gradient"}
                    shineY={1}
                >
                    <Headline />
                    <PreviewWindow preview={footer.preview} />
                    <BottomBar />
                </Block>
            </Block>
        </footer>
    );
}

function Headline() {
    return (
        <div className="w-full flex justify-between items-start gap-x-10 ">
            <div className="flex flex-col gap-y-3 ">
                <div
                    className={cn(
                        "text-7xl font-extrabold text-shadow-md ",
                        "bg-linear-to-b from-primary-light/60 to-transparent bg-clip-text text-transparent ",
                    )}
                >
                    {footer.heading}
                </div>
                <div className="max-w-100 text-sm text-primary-light/40 ">
                    {footer.tagline}
                </div>
            </div>
            <Clock size={70} />
        </div>
    );
}

function BottomBar() {
    return (
        <div className="w-full flex flex-col gap-y-5 ">
            <div className="h-px w-full bg-linear-to-r from-transparent via-primary-light/10 to-transparent " />
            <div className="flex justify-between items-center gap-x-10 ">
                <SocialLinks socials={footer.socials} />
                <div className="text-xs text-primary-light/30 ">
                    {`© ${new Date().getFullYear()} ${user.name} — built with Next.js`}
                </div>
            </div>
        </div>
    );
}
