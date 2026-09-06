import UserType from "../types/user.type";


const user: UserType = {
    name: "Anjan Suman",
    image: "/images/profile.jpeg",
    contacts: [
        { kind: "email", label: "email", href: "mailto:anjansuman80@gmail.com" },
        { kind: "x", label: "x", href: "https://x.com/anjanstwt" },
        { kind: "linkedin", label: "linkedin", href: "https://linkedin.com/in/anjanstwt" },
        { kind: "github", label: "github", href: "https://github.com/anjanstwt" },
        { kind: "resume", label: "resume", href: "https://drive.google.com/file/d/1Xy5XBI6Uzfof4Ok88rIVUZsnCPF2NtB4/view?usp=sharing" },
    ],
};

export default user;
