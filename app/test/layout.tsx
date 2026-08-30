import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Test",
    description: "footer built from the block and safari components.",
};

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-ink">
                {children}
            </body>
        </html>
    );
}
