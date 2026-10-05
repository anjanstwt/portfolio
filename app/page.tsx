import { Inter } from "next/font/google";
import HeroSection from "@/components/home/HeroSection";
import IntroGrid from "@/components/home/sections/IntroGrid";
import LinksGrid from "@/components/home/sections/LinksGrid";
import AboutGrid from "@/components/home/sections/AboutGrid";
import SetLenisSpeed from "@/components/providers/SetLenisSpeed";
import WhatIDoGrid from "@/components/home/sections/WhatIDoGrid";
import WhatIUseGrid from "@/components/home/sections/WhatIUseGrid";
import ToolsIUseGrid from "@/components/home/sections/ToolsIUseGrid";
import HobbyGrid from "@/components/home/sections/HobbyGrid";
import ContactsGrid from "@/components/home/sections/ContactsGrid";
import PagesGrid from "@/components/home/sections/PagesGrid";
import DetailsPanelOverlay from "@/components/home/details-panel/DetailsPanelOverlay";
import ThemeToggle from "@/components/home/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

const FONT_STACK =
    'Inter, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default function Page() {
    return (
        <div className={inter.className} style={{ fontFamily: FONT_STACK }}>
            <div className="bg-page min-h-screen w-full select-none ">
                <SetLenisSpeed factor={1} />
                <div className="w-full max-w-212 max-md:max-w-[520px] mx-auto px-4 py-10 text-mute text-sm min-[480px]:max-md:text-base flex flex-col gap-y-4 font-light tracking-wide ">
                    <HeroSection />
                    <IntroGrid />
                    <LinksGrid />
                    <AboutGrid />
                    <WhatIDoGrid />
                    <WhatIUseGrid />
                    <ToolsIUseGrid />
                    <HobbyGrid />
                    <ContactsGrid />
                    <PagesGrid />
                </div>
            </div>
            <DetailsPanelOverlay />
            <ThemeToggle />
        </div>
    );
}
