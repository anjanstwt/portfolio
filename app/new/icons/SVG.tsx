import { ComponentType } from "react";
import Cal from "./Cal";
import India from "./India";
import Winterfell from "./Winterfell";
import HighGarden from "./HighGarden";
import Nocturn from "./Nocturn";
import Matcha from "./Matcha";
import { cn } from "cn";

export type SVGType =
    "cal" | "india" | "winterfell" | "highgarden" | "nocturn" | "matcha";

const icons: Record<
    SVGType,
    ComponentType<{ className?: string; color?: string }>
> = {
    cal: Cal,
    india: India,
    winterfell: Winterfell,
    highgarden: HighGarden,
    nocturn: Nocturn,
    matcha: Matcha,
};

interface SVGProps {
    type: SVGType;
    className?: string;
    color?: string;
}

export default function SVG({ type, className, color }: SVGProps) {
    const Icon = icons[type];
    return <Icon className={cn("size-4.5", className)} color={color} />;
}
