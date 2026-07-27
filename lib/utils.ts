import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// bg-noise / text-noise are custom utilities (app/theme.css) that layer a
// grain texture via background-image. tailwind-merge's default config has
// no idea they exist, so it falls back to bucketing any bg-*/text-* class
// into the built-in background-color/text-color groups — which makes it
// treat "hover:bg-[#6c44fc] hover:bg-noise" as conflicting and silently
// drop the color, since only one class per group survives a merge.
const twMerge = extendTailwindMerge<'bg-noise' | 'text-noise'>({
    extend: {
        classGroups: {
            'bg-noise': ['bg-noise'],
            'text-noise': ['text-noise'],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
