import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import { Gochi_Hand, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const handwriting = Gochi_Hand({ subsets: ["latin"], weight: "400", variable: "--font-handwriting-src" });

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
        <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable, handwriting.variable)}>
            <head>
                {/* Runs before first paint so a saved light preference never flashes dark. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
                    }}
                />
            </head>
            <body className="bg-ink bg-noise">
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
