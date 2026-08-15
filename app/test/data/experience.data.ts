import ExperienceType from "../types/experience.type";


const Experiences: ExperienceType[] = [
    {
        company: "SpiderSkill",
        image: "/projects/winterfell/page2.png",
        role: "Full-Stack Developer Intern",
        period: "June, 2026 to Present",
        link: "spiderskill.com",
        github: "",
        description: "Built and scaled a full-stack internship marketplace from the ground up using Next.js, React, and Express, supporting 150+ live users across employer and candidate workflows. Designed and implemented a role-based admin system with dedicated dashboards and streamlined management workflows, reducing manual operational overhead by 35%. Developed real-time employer-candidate communication using native WebSockets, achieving sub-150ms message latency while ensuring reliable message delivery and responsive user interactions. Worked across the frontend, backend, database, authentication, and deployment layers to build and maintain production-ready features.",
        skills: ["Typescript", "NextJS", "ExpressJS", "Supabase", "AWS",],
    },
    {
        company: "Wallpaper Heaven",
        image: "/experience/wallpaper-heaven/landing.png",
        role: "Software Developer Intern",
        period: "May, 2025 to July, 2025",
        link: "",
        github: "github.com/anjanstwt/Wallpaper-Heaven",
        description: "Built a CMS-driven website and content management system from scratch, enabling non-technical users to independently manage and update 10+ sections of the website and reducing client onboarding and content management time by 70%. Designed and optimized the TypeScript and Prisma data layer with efficient indexing and selective field hydration, reducing database query latency by 40%. Deployed the application on AWS EC2 with Nginx and server-side rendering, achieving page load times under 1.2 seconds. Developed reusable frontend components and scalable backend APIs to improve maintainability and support future expansion of the platform.",
        skills: [],
    }
];

export default Experiences;