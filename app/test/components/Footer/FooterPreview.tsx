import { cn } from "@/lib/utils";
import Block from "../../ui/Block";
import { contact } from "../../data/footer.data";
import user from "../../data/user.data";


/**
 * The page rendered inside the Safari frame of the footer.
 * Safari scales it down from a full viewport, so it is sized in viewport units.
 */
export default function FooterPreview() {
    return (
        <div className="h-full w-full bg-ink flex flex-col justify-center items-center gap-y-10 ">
            <div
                className={cn(
                    "text-[140px] leading-none font-semibold text-shadow-xs ",
                    "bg-linear-to-b from-primary-light/20 to-transparent bg-clip-text text-transparent ",
                )}
            >
                {"Say hi to " + user.name}
            </div>
            <Block
                variant={"gradient"}
                className="px-12 py-6 rounded-full text-4xl text-primary-light/60 "
            >
                {contact.email}
            </Block>
            <div className="text-2xl text-primary-light/30 ">
                {contact.tagline}
            </div>
        </div>
    );
}
