import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Projects",
    description: "Glass glyph heroes.",
};

export default function ProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-ink">{children}</body>
        </html>
    );
}
