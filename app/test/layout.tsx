import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "test — anjan",
    description: "test page.",
};

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                {children}
            </body>
        </html>
    );
}
