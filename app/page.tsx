import { Inter } from "next/font/google";
import HeroSection from "./components/Hero/HeroSection";
import IntroGrid from "./components/sections/IntroGrid";
import LinksGrid from "./components/sections/LinksGrid";
import AboutGrid from "./components/sections/AboutGrid";
import SetLenisSpeed from "./components/SetLenisSpeed";
import WhatIDoGrid from "./components/sections/WhatIDoGrid";
import WhatIUseGrid from "./components/sections/WhatIUseGrid";
import ToolsIUseGrid from "./components/sections/ToolsIUseGrid";
import HobbyGrid from "./components/sections/HobbyGrid";
import ContactsGrid from "./components/sections/ContactsGrid";
import PagesGrid from "./components/sections/PagesGrid";

const inter = Inter({ subsets: ["latin"] });

const FONT_STACK =
    'Inter, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default function Page() {
    return (
        <div className={inter.className} style={{ fontFamily: FONT_STACK }}>
            <div className="bg-blade min-h-screen w-full select-none ">
                <SetLenisSpeed factor={1} />
                <div className="w-208 mx-auto py-10 text-steel text-sm flex flex-col gap-y-4 font-light tracking-wide ">
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
        </div>
    );
}
