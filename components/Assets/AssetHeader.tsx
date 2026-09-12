import Link from "next/link";

import Logo from "../ui/icons/Logo";

// Thin top strip shared by the assets pages: the tilde takes you home, the
// path shows where you are. Same voice as the footer's "~/anjan" line.
export default function AssetHeader({ trail = [] }: { trail?: string[] }) {
    return (
        <header className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-light/50">
            <Link href="/" className="flex items-center transition-colors hover:text-primary-light" aria-label="home">
                <Logo variant="tilde" size={26} />
            </Link>
            <Link href="/assets" className="transition-colors hover:text-primary-light">
                /assets
            </Link>
            {trail.map((part) => (
                <span key={part} className="text-primary-light/80">
                    /{part}
                </span>
            ))}
        </header>
    );
}
