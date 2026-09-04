import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Winterfell",
    description: "Glass glyph hero.",
};

export default function WinterfellLayout({
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
