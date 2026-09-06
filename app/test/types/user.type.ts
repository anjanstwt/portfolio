export type ContactKind = "email" | "x" | "linkedin" | "github" | "resume";

export interface ContactType {
    kind: ContactKind;
    label: string;
    href: string;
}

export default interface UserType {
    name: string,
    image: string,
    contacts: ContactType[],
}
