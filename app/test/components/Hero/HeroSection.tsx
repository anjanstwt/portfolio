"use client";

import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="w-full flex flex-col gap-y-10 ">
            <div className="w-full flex justify-between items-center text-steel text-xs ">
                <div className="flex justify-center items-center gap-x-3">
                    <span>EST .</span>
                    <span>2006</span>
                </div>
                <div className=""></div>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="relative h-14 w-14 ">
                    <Image
                        src={"/images/profile.jpeg"}
                        alt={"anjan"}
                        fill
                        className="object-contain rounded-2xl corner-squircle "
                    />
                    <div className="absolute -bottom-0.75 -right-2 bg-board-black p-0.75 rounded-full ">
                        <div className="size-3 bg-green-500 rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="">Anjan Suman</div>
                    <div className="text-steel">Engineer</div>
                </div>
                <div className="text-steel ">
                    Hey, I'm
                    <span>{" Anjan "}</span>
                    a
                    <span>{" founding engineer "}</span>
                    at
                    <span className="text-white ">{" Wait "}</span>
                    based in
                    <span>{" Jharkhand, India "}</span>
                    where I specialize in crafting
                    polished web interfaces with a strong focus on
                    accessibility, web animation, and product design.
                </div>
            </div>
        </section>
    );
}
