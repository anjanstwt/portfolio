import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "interactions — anjan",
    description: "interaction experiments by anjan.",
};

export default function InteractionsLayout({
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
