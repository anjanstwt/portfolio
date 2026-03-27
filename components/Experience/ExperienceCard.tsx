import Image from "next/image";
import { Roboto } from "next/font/google";
import wallpaper_heaven from "@/public/wallpaper-heaven.png";
import { ExperienceDetails } from "./ExperienceDetails";
import { IconExternalLink } from "@tabler/icons-react";

const roboto = Roboto({
    subsets: ["latin"]
});

interface ExperienceCardProps {
    company: string,
    className?: string
}

export const ExperienceCard = ({ company, className }: ExperienceCardProps) => {

    const experience = ExperienceDetails.find((c) => {
        if (c.company === company) {
            return c;
        }
    })

    return <div className={`w-full h-full flex flex-col justify-around gap-y-2 items-end text-end ${className} `}>
        <div className="w-full flex justify-end gap-x-5 ">
            <div className="flex flex-col justify-around items-end text-end ">
                <div className="text-[21px] 2xl:text-3xl">
                    {experience?.company}
                </div>
                <div className="flex flex-col ">
                    <div className="text-[#3d3932] xl:text-[14px] 2xl:text-lg ">
                        {experience?.role}
                    </div>
                    <div className={`text-[#3d3932] text-[10px] 2xl:text-xs ${roboto.className} `}>
                        {experience?.duration}
                    </div>
                </div>
            </div>
            <a
                target="_blank"
                href={experience?.web}
                className="w-40 2xl:w-44 h-[104px] 2xl:h-30 relative flex justify-center items-center rounded overflow-hidden bg-[#50130E] "
            >
                <Image src={wallpaper_heaven} alt={"Wallpaper-Heaven"} width={100} className="object-cover " unoptimized />
                <div className="absolute right-0 top-0 p-1 bg-[#0f0f0f] rounded-bl-lg rounded-tr-lg ">
                    <IconExternalLink className="text-[#D8CFBC] size-5 " />
                </div>
            </a>
        </div>
        <div className={`text-xs md3:text-sm lg:text-xs 2xl:text-sm text-justify ${roboto.className} `}>
            {experience?.description}
        </div>
    </div>
}