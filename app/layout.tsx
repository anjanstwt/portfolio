import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/base/Navbar";
import CommandMenu from "@/components/ui/CommandMenu";

const dsd = DM_Serif_Display({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const geist = Geist_Mono({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "anjan",
    description: "portfolio of anjan, building web3, full stack, and high performance applications.",
    openGraph: {
        title: "anjan",
        description: "Explore projects, skills, and contact info.",
        url: "https://anjan.site",
        siteName: "anjan",
        images: [
            {
                url: "/images/profile.jpeg",
                width: 1200,
                height: 630,
                alt: "Anjan Suman Portfolio Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Anjan Suman — Full Stack Developer",
        description: "Explore projects, skills, and contact info.",
        images: ["/images/preview.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${dsd.className} antialiased`}
            >

                <LenisProvider>
                    <div className={cn(
                        `min-h-screen w-full font-sans bg-secondary-dark text-white flex flex-col items-center selection:bg-neutral-800 selection:text-white`,
                        geist.className,
                    )}>
                        <Navbar
                            data-lenis-prevent
                        />
                        <CommandMenu />
                        <div className="w-full max-w-3xl px-4 sm:px-6 border-x border-neutral-800 min-h-[calc(100vh-4rem)]">
                            {children}
                        </div>
                    </div>
                </LenisProvider>
            </body>
        </html>
    );
}
