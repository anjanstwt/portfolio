import { create } from "zustand";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

// Shared with the pre-paint script in app/layout.tsx, which reads this key and
// adds `light` to <html> before React hydrates so there is no flash.
const STORAGE_KEY = "theme";

interface ThemeStore {
    theme: Theme;
    hydrated: boolean;
    /** Read the class the layout script already applied to <html>. */
    hydrate: () => void;
    setTheme: (theme: Theme) => void;
    toggle: () => void;
}

function applyToDocument(theme: Theme) {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // storage blocked (private mode); the class still applies for this visit
    }
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
    theme: "dark",
    hydrated: false,

    hydrate: () => {
        if (get().hydrated) return;
        set({
            theme: document.documentElement.classList.contains("light") ? "light" : "dark",
            hydrated: true,
        });
    },

    setTheme: (theme) => {
        const commit = () => {
            applyToDocument(theme);
            // flushSync so React's own updates (icon swap, calendar colours) land
            // inside the view-transition snapshot rather than a frame later.
            flushSync(() => set({ theme }));
        };
        // typed loosely: startViewTransition is missing from older lib.dom builds
        const doc = document as Document & {
            startViewTransition?: (update: () => void) => unknown;
        };
        if (typeof doc.startViewTransition === "function") {
            doc.startViewTransition(commit);
        } else {
            commit();
        }
    },

    toggle: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
}));
