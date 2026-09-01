
export type SocialLabel = "GitHub" | "X" | "LinkedIn";

export interface SocialType {
    label: SocialLabel,
    href: string,
}

export default interface FooterType {
    heading: string,
    tagline: string,
    preview: {
        src: string,
        alt: string,
        url: string,
    },
    socials: SocialType[],
}
