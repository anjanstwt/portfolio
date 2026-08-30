import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Test",
    description: "sandbox page for trying out new components.",
};

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-night">
                {children}
            </body>
        </html>
    );
}
