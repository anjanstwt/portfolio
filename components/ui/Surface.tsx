import * as React from "react";
import { cn } from "@/lib/utils";

type SurfaceOwnProps<E extends React.ElementType> = {
    as?: E;
    engraved?: boolean;
    pebble?: boolean;
    className?: string;
};

type SurfaceProps<E extends React.ElementType> = SurfaceOwnProps<E> &
    Omit<React.ComponentPropsWithoutRef<E>, keyof SurfaceOwnProps<E>>;

const DEFAULT_ELEMENT = "div";

export default function Surface<E extends React.ElementType = typeof DEFAULT_ELEMENT>({
    as,
    engraved,
    pebble,
    className,
    ...rest
}: SurfaceProps<E>) {
    const Component = as || DEFAULT_ELEMENT;

    return (
        <Component
            className={cn(engraved && "surface-engraved", pebble && "surface-pebble", className)}
            {...rest}
        />
    );
}
