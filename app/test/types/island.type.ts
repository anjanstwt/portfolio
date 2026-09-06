export type IslandState =
    | "navbar"
    | "project"
    | "experience"
    | "contact"
    | "idle"
    | "ring"
    | "timer"
    | "record"
    | "music"
    | "airdrop"
    | "airdropMini"
    | "lowBattery"
    | "phone"
    | "findmy"
    | "screenRecord";

export interface IslandDimensions {
    /** A number in px, or "auto" to fit the view's content. */
    width: number | "auto";
    height: number | "auto";
    borderRadius: number;
}

/** Props every island view receives. */
export interface ViewProps {
    onClose: () => void;
}

/** Page sections the island reacts to. Also used as the DOM id the navbar scrolls to. */
export type SectionId = "intro" | "projects" | "skills" | "experience" | "orbit" | "contact" | "end";
