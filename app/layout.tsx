import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import { Caveat, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

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
        <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable, caveat.variable)}>
            <body className="bg-ink bg-noise">
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
