import { cn } from "@/lib/utils";

interface BlockProps {
    label: string;
    value: string;
    href?: string;
    className?: string;
}

/**
 * A single bordered cell of the footer grid. Renders as an anchor when a
 * link is provided, and as a plain block otherwise.
 */
export default function Block({ label, value, href, className }: BlockProps) {
    const content = (
        <>
            <span className="text-[10px] tracking-[0.2em] text-primary-light/40">
                {label.toUpperCase()}
            </span>
            <span className="text-sm text-primary-light/80 group-hover:text-primary-light transition-colors">
                {value}
            </span>
        </>
    );

    const styles = cn(
        "group flex flex-col gap-y-2 p-4 min-h-24",
        "border-b border-r border-primary-light/10",
        "hover:bg-primary-light/[0.03] transition-colors",
        className,
    );

    if (!href) {
        return <div className={styles}>{content}</div>;
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles}
        >
            {content}
        </a>
    );
}
