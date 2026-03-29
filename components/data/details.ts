import { BsTwitterX } from "react-icons/bs";
import { DetailsType, DetailType } from "../types/details-type";
import { IoIosMail, IoLogoGithub } from "react-icons/io";
import { FaLinkedinIn, FaMapMarkerAlt } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";

export const details: DetailsType[] = [
    {
        type: DetailType.X,
        logo: BsTwitterX,
        link: "https://x.com/anjanstwt",
        tooltip: "anjanstwt",
        label: "X",
    },
    {
        type: DetailType.GITHUB,
        logo: IoLogoGithub,
        link: "https://github.com/anjanstwt",
        tooltip: "anjanstwt",
        label: "GITHUB",
    },
    {
        type: DetailType.LINKEDIN,
        logo: FaLinkedinIn,
        link: "https://linkedin.com/in/anjanstwt",
        tooltip: "anjanstwt",
        label: "LINKEDIN",
    },
    {
        type: DetailType.EMAIL,
        logo: IoIosMail,
        link: "mailto:anjansuman80@gmail.com",
        tooltip: "anjansuman80@gmail.com",
        label: "MAIL",
    },
    {
        type: DetailType.ADDRESS,
        logo: FaMapMarkerAlt,
        link: "https://maps.app.goo.gl/94616561656165616561",
        tooltip: "anjanstwt",
        label: "ADDRESS",
    },
    {
        type: DetailType.RESUME,
        logo: FaFileLines,
        link: "https://drive.google.com/file/d/1Xy5XBI6Uzfof4Ok88rIVUZsnCPF2NtB4/view?usp=sharing",
        tooltip: "resume",
        label: "RESUME",
    }
];
