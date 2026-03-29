'use client';

import Experience from "@/components/base/Experience";
import Footer from "@/components/base/Footer";
import GithubContributions from "@/components/base/GithubContributions";
import Interested from "@/components/base/Interested";
import Overview from "@/components/base/Overview";
import Projects from "@/components/base/Projects";
import Tech from "@/components/base/Tech";
import Title from "@/components/base/Title";

export default function Page() {
    return (
        <div className="flex flex-col pb-16">
            <Title />
            <GithubContributions />
            
            <div className="flex flex-col gap-y-8 sm:gap-y-12 mt-8 sm:mt-12 w-full">
                <div id="overview">
                    <Overview />
                </div>
                <div id="experience">
                    <Experience />
                </div>
                <div id="projects">
                    <Projects />
                </div>
                <div id="tech">
                    <Tech />
                </div>
                <div id="interested">
                    <Interested />
                </div>
                <Footer />
            </div>
        </div>
    );
}