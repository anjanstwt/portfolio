'use client';
import Experience from "@/components/base/Experience";
import Footer from "@/components/base/Footer";
import GithubContributions from "@/components/base/GithubContributions";
import Interested from "@/components/base/Interested";
import Overview from "@/components/base/Overview";
import Projects from "@/components/base/Projects";
import Tech from "@/components/base/Tech";
import Title from "@/components/base/Title";
import { HorizontalGap } from "@/components/ui/Gap";
import Line from "@/components/ui/Line";

export default function Page() {

    return (
        <div className="w-full flex flex-col items-center ">
            <Line />
            <Title className="layout-width layout-side-border layout-padding " />
            <HorizontalGap />
            <GithubContributions className="layout-width layout-side-border layout-padding " />
            <Line />
            <Overview className="layout-width layout-side-border " />
            <Line />
            <Experience className="layout-width layout-side-border " />
            <Line />
            <Projects className="layout-width layout-side-border " />
            <Line />
            <Tech className="layout-width layout-side-border " />
            <Line />
            <Interested className="layout-width layout-side-border layout-padding " />
            <HorizontalGap />
            <Footer className="layout-width layout-side-border layout-padding " />
            <Line />
            {/* <DustParticles particleColor={0xfdf9f0} /> */}
        </div>
    );

}