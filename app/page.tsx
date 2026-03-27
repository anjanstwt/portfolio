'use client';

import Experience from "@/components/base/Experience";
import Footer from "@/components/base/Footer";
import GithubContributions from "@/components/base/GithubContributions";
import Interested from "@/components/base/Interested";
import Overview from "@/components/base/Overview";
import Projects from "@/components/base/Projects";
import Tech from "@/components/base/Tech";
import Title from "@/components/base/Title";
import ThickSeparator from "@/components/ui/ThickSeparator";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-16 md:gap-y-24 pb-20">
            <Title />
            <ThickSeparator />
            <GithubContributions />
            <ThickSeparator />
            <div id="overview">
                <Overview />
            </div>
            <ThickSeparator />
            <div id="experience">
                <Experience />
            </div>
            <ThickSeparator />
            <div id="projects">
                <Projects />
            </div>
            <ThickSeparator />
            <div id="tech">
                <Tech />
            </div>
            <Interested />
            <Footer />
        </div>
    );
}