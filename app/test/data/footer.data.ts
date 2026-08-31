import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosMail, IoLogoGithub } from "react-icons/io";
import FooterLinkType from "../types/footer.type";


export const contact = {
    email: "anjansuman80@gmail.com",
    tagline: "Open for internships, freelance work, and late night side quests.",
};

const footerLinks: FooterLinkType[] = [
    {
        label: "X",
        handle: "anjanstwt",
        link: "https://x.com/anjanstwt",
        icon: BsTwitterX,
    },
    {
        label: "GitHub",
        handle: "anjanstwt",
        link: "https://github.com/anjanstwt",
        icon: IoLogoGithub,
    },
    {
        label: "LinkedIn",
        handle: "anjanstwt",
        link: "https://linkedin.com/in/anjanstwt",
        icon: FaLinkedinIn,
    },
    {
        label: "Mail",
        handle: contact.email,
        link: `mailto:${contact.email}`,
        icon: IoIosMail,
    },
];

export default footerLinks;
