"use client"

import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience/Experience";
import { Name } from "@/components/Name";
import { NavBar } from "@/components/NavBar/NavBar";
import { Profile } from "@/components/Profile";
import { Projects } from "@/components/Projects/Projects";
import { Tech } from "@/components/Tech/Tech";
import gsap from "gsap";
import { useEffect, useRef } from "react";


export default function Home() {

    const NavBarDesktopRef = useRef<HTMLDivElement>(null);
    const NavBarPhoneRef = useRef<HTMLDivElement>(null);

    const NameDesktopRef = useRef<HTMLDivElement>(null);
    const NamePhoneRef = useRef<HTMLDivElement>(null);

    const profileDesktopRef = useRef<HTMLDivElement>(null);
    const profilePhoneRef = useRef<HTMLDivElement>(null);

    const ProjectsDesktopRef = useRef<HTMLDivElement>(null);
    const ProjectsPhoneRef = useRef<HTMLDivElement>(null);

    const ExperienceDesktopRef = useRef<HTMLDivElement>(null);
    const ExperiencePhoneRef = useRef<HTMLDivElement>(null);

    const TechDesktopRef = useRef<HTMLDivElement>(null);
    const TechPhoneRef = useRef<HTMLDivElement>(null);

    const ContactDesktopRef = useRef<HTMLDivElement>(null);
    const ContactPhoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            const profileD = profileDesktopRef.current;
            const profileP = profilePhoneRef.current;

            const nameD = NameDesktopRef.current;
            const nameP = NamePhoneRef.current;

            const navD = NavBarDesktopRef.current;
            const navP = NavBarPhoneRef.current;

            const projectsD = ProjectsDesktopRef.current;
            const projectsP = ProjectsPhoneRef.current;

            const techD = TechDesktopRef.current;
            const techP = TechPhoneRef.current;

            const experienceD = ExperienceDesktopRef.current;
            const experienceP = ExperiencePhoneRef.current;

            const contactD = ContactDesktopRef.current;
            const contactP = ContactPhoneRef.current;

            if (!profileD || !nameD || !navD || !projectsD || !techD || !experienceD || !contactD || !profileP || !nameP || !navP || !projectsP || !techP || !experienceP || !contactP) return;

            const rectD = profileD.getBoundingClientRect();
            const rectP = profileP.getBoundingClientRect();

            const tl = gsap.timeline();

            tl.set(profileD, {
                x: (window.innerWidth / 2 - (rectD.left + rectD.width / 2)),
                y: (window.innerHeight / 2 - (rectD.top + rectD.height / 2)),
                scale: 1.3,
                opacity: 1,
            },
                "profile1"
            );

            tl.set(profileP, {
                x: (window.innerWidth / 2 - (rectP.left + rectP.width / 2)),
                y: (window.innerHeight / 2 - (rectP.top + rectP.height / 2)),
                scale: 0.7,
                opacity: 1,
            },
                "profile1"
            );

            tl.to({}, {
                duration: 0.7
            });

            tl.to(profileD, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
            },
                "profile2"
            );

            tl.to(profileP, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
            },
                "profile2"
            );

            tl.to(profileD, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            },
                "profile3"
            );

            tl.to(profileP, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            },
                "profile3"
            );

            // this is for elements which will appear on screens greater than md
            tl.fromTo(
                [nameD, techD, projectsD, experienceD, navD, contactD],
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.2
                },
                "fadeIn" // this is a className basically to operate at same with the same className
            );

            // this is for elements which will appear on screens smaller than md
            tl.fromTo(
                [nameP, techP, projectsP, experienceP, navP, contactP],
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.2
                },
                "fadeIn"
            );

        });
    }, []);

    return (
        <div className="w-screen lg:h-screen flex flex-col justify-center items-center bg-[#0f0f0f] p-3 md:p-5 text-[#0f0f0f]
            overflow-x-hidden overflow-y-auto lg:overflow-y-hidden [::-webkit-scrollbar]:hidden [scrollbar-width:none] scroll-smooth"
        >

            {/* this will be hidden for the screens smaller than md */}
            <div
                className="max-w-[1884px] h-lvw lg:max-h-[70vw] xl:h-full
                    hidden md:grid
                    md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12
                    md:grid-rows-9 lg:grid-rows-10 xl:grid-rows-10 2xl:grid-rows-10
                    gap-x-5 gap-y-5 "
            >

                {/* grid-rows-[repeat(19,minmax(0,1fr))] lg:grid-rows-[repeat(10,minmax(0,1fr))] */}
                <NavBar
                    ref={NavBarDesktopRef}
                    className="opacity-0   
                        md:col-span-12 2xl:col-span-12
                        md:row-span-1 2xl:row-span-1 "
                />

                <Tech
                    ref={TechDesktopRef}
                    className="opacity-0 h-full flex flex-col
                        md:col-span-7 lg:col-span-5 2xl:col-span-5
                        md:row-span-4 lg:row-span-5 2xl:row-span-5 "
                />

                <Profile
                    ref={profileDesktopRef}
                    className="opacity-0 h-full
                        md:col-span-5 lg:col-span-3 2xl:col-span-3
                        md:row-span-4 lg:row-span-5 2xl:row-span-5 "
                />

                {/* will get hidden for the screen smaller that lg */}
                <Projects
                    ref={ProjectsDesktopRef}
                    className="opacity-0
                        hidden lg:flex flex-col
                        col-span-4 2xl:col-span-4
                        row-span-8 2xl:row-span-8 "
                />

                <Experience
                    ref={ExperienceDesktopRef}
                    className="opacity-0
                        md:col-span-6 lg:col-span-4 2xl:col-span-4
                        md:row-span-4 lg:row-span-5 2xl:row-span-5 "
                />

                <Name
                    ref={NameDesktopRef}
                    className="opacity-0
                        md:col-span-6 lg:col-span-4 2xl:col-span-4
                        md:row-span-4 lg:row-span-5 2xl:row-span-5 "
                />

                {/* will get hidden for the screen smaller that lg */}
                <Contact
                    ref={ContactDesktopRef}
                    className="opacity-0
                        hidden lg:flex
                        col-span-4 2xl:col-span-4
                        row-span-2 2xl:row-span-2 "
                />

            </div>

            {/* this will appear when screen size is less than md */}
            <div
                className="w-full h-full
                    grid gap-3 md:hidden
                    grid-cols-1"
            >
                <NavBar ref={NavBarPhoneRef} />
                <Profile ref={profilePhoneRef} />
                <Name ref={NamePhoneRef} />
                <Experience ref={ExperiencePhoneRef} />
                <Tech ref={TechPhoneRef} />

            </div>

            {/* make the wallet panel for phone and also make a loader for it */}

            {/* appears only if the screen size is less than lg [this is for shifting the side components to the bottom] */}
            <div
                className="lg:hidden w-full mt-3 md:mt-5 grid gap-3 md:gap-5
                    grid-cols-1
                    grid-rows-9 "
            >

                <Projects
                    ref={ProjectsPhoneRef}
                    className="opacity-0
                        col-span-full
                        row-span-8"
                />

                <Contact
                    ref={ContactPhoneRef}
                    className="opacity-0
                        col-span-full
                        row-span-1"
                />

            </div>

        </div>
    );
}
