"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";

/**
 * Current theme plus a toggle. The store starts as "dark" on both server and
 * client (so SSR markup matches), then syncs to whatever class the layout's
 * inline script put on <html> once mounted.
 */
export function useTheme() {
    const theme = useThemeStore((s) => s.theme);
    const hydrated = useThemeStore((s) => s.hydrated);
    const hydrate = useThemeStore((s) => s.hydrate);
    const toggle = useThemeStore((s) => s.toggle);
    const setTheme = useThemeStore((s) => s.setTheme);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    return { theme, hydrated, toggle, setTheme };
}
