import { cn } from "@/lib/utils"
import Image from "next/image";


export default function Experience() {
    return (
        <section className="min-h-screen relative ">
            <div className="h-full w-full p-10">
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-1/2 ",
                        "h-full w-full ",
                        "flex justify-center items-center gap-x-4",
                        "text-cement/70 text-8xl font-black "
                    )}
                >
                    <div className="w-[50%] flex justify-center items-center">Work</div>
                    <div className="w-[50%] flex justify-center items-center ">Experience</div>
                </div>
                <Block className={"absolute top-10 bottom-10 right-10 w-[calc(50%-2.5rem)] z-10 p-2 flex flex-col gap-y-2 "}>
                    <Block
                        className={cn("h-[70%] w-full rounded-[36px] rounded-b-xl overflow-hidden ")}
                        variant={"gradient"}
                    >
                        <Image
                            src={"/experience/wallpaper-heaven/landing2.png"}
                            alt={"winterfell"}
                            fill
                            className="object-cover "
                        />
                    </Block>
                    <Block
                        className={cn("h-[30%] w-full rounded-[36px] rounded-t-xl ")}
                        variant={"gradient"}
                    />
                </Block>

            </div>
        </section>
    )
}

interface BlockProps {
    variant?: "default" | "gradient";
    className?: string;
    children?: React.ReactNode;
}

function Block({ variant, className, children }: BlockProps) {
    return (
        <div
            className={cn(
                "flex justify-center items-center ",
                "bg-cement/10 backdrop-blur-md text-white rounded-[44px] border border-primary-light/10 ",
                "relative shadow-2xl",
                variant === "gradient" && "bg-linear-to-br from-primary-light/5 to-transparent backdrop-blur-none ",
                className,
            )}
        >
            <span className="absolute inset-x-8 top-0 h-[0.5px] bg-linear-to-r from-transparent via-primary-light/70 to-transparent " />
            {children}
        </div>
    )
}