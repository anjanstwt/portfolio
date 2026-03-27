import Image from "next/image";
import profile from "../public/profile.jpg";

interface ProfileProps {
    ref?: React.Ref<HTMLDivElement>,
    className?: string
}

export const Profile = ({ ref, className }: ProfileProps) => {

    return <div
        className={`h-[80vw] w-full md:h-full relative bg-[#565449] rounded overflow-hidden ${className}`}
        ref={ref}
    >
        <Image
            src={profile}
            alt={"Anjan Suman"}
            unoptimized
            className="w-full h-full object-cover object-top lg:object-center "
        />
    </div>
}