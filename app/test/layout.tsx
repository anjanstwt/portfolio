import type { Metadata } from "next";
import "../globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import TestNavbar from "./components/Navbar/TestNavbar";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "pixelated scroll-driven theme transition experiment.",
};

export default function ScrollTestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-ink ">
                <LenisProvider>
                    <TestNavbar />
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
