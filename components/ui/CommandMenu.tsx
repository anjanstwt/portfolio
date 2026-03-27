'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Map, Code, User, FileText, Smartphone, Mail, X, Cpu, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { projects } from '../data/projects';
import { experiences } from '../data/experiences';
import { details } from '../data/details';
import { Logos } from '../Logos/Logos';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navigationItems = [
    {
        label: "Overview",
        icon: User,
        action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
        label: "Experience",
        icon: Map,
        action: () =>
            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
        label: "Projects",
        icon: Code,
        action: () =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
        label: "Tech Stack",
        icon: Cpu,
        action: () =>
            document.getElementById("tech")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
        label: "Contact",
        icon: MessageSquare,
        action: () =>
            document.getElementById("interested")?.scrollIntoView({ behavior: "smooth" }),
    },
];

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', down, true);
        return () => document.removeEventListener('keydown', down, true);
    }, []);

    // Also expose a global method or custom event to open it from Navbar
    useEffect(() => {
        const handleOpenCmdk = () => setOpen(true);
        window.addEventListener('open-cmdk', handleOpenCmdk);
        return () => window.removeEventListener('open-cmdk', handleOpenCmdk);
    }, []);

    const runCommand = (command: () => unknown) => {
        setOpen(false);
        setTimeout(() => command(), 100);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[6px] border border-neutral-800 bg-[#09090b] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <Command
                    className="flex h-full w-full flex-col bg-transparent text-neutral-100"
                    loop
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setOpen(false);
                        }
                    }}
                >
                    <div className="flex items-center border-b border-neutral-800 px-3 opacity-90">
                        <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-500" />
                        <Command.Input
                            autoFocus
                            value={search}
                            onValueChange={setSearch}
                            placeholder="Type a command or search..."
                            className="flex h-12 w-full rounded bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            onClick={() => setOpen(false)}
                            className="ml-2 rounded p-1 text-neutral-500 hover:bg-white/5 hover:text-neutral-200"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden hide-scrollbar overscroll-contain" data-lenis-prevent>
                        <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                            No results found.
                        </Command.Empty>
                        <Command.Group
                            heading="Navigation"
                            className={cn("text-xs font-medium text-neutral-500 ",
                                "[&_[cmdk-group-heading]]:px-4 ",
                                "[&_[cmdk-group-heading]]:py-2 ",
                                "[&_[cmdk-group-heading]]:border-y ",
                                "[&_[cmdk-group-heading]]:border-neutral-800 ",
                                "[&_[cmdk-list]]:px-2 ",
                                "[&_[cmdk-list]]:py-2",
                            )}
                        >
                            {navigationItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Command.Item
                                        key={item.label}
                                        onSelect={() => runCommand(item.action)}
                                        className="relative flex cursor-pointer select-none items-center px-2 py-2.5 text-sm outline-none aria-selected:bg-white/5 aria-selected:text-white"
                                    >
                                        <Icon className="mr-2 h-4 w-4 opacity-70" />
                                        <span>{item.label}</span>
                                    </Command.Item>
                                );
                            })}
                        </Command.Group>

                        <Command.Group heading="Projects" className="text-xs font-medium text-neutral-500 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:border-y [&_[cmdk-group-heading]]:border-neutral-800 [&_[cmdk-list]]:px-2 [&_[cmdk-list]]:py-2">
                            {projects.map((project, idx) => (
                                <Command.Item
                                    key={idx}
                                    value={project.title}
                                    onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}
                                    className="relative flex cursor-pointer select-none items-center px-2 py-2.5 text-sm outline-none aria-selected:bg-white/5 aria-selected:text-white"
                                >
                                    {project.logo ? (
                                        <div className="mr-2 h-4 w-4 opacity-80 flex items-center justify-center">
                                            <Image src={project.logo} alt={project.title} width={16} height={16} className="rounded-sm object-cover" unoptimized />
                                        </div>
                                    ) : (
                                        <Code className="mr-2 h-4 w-4 opacity-70" />
                                    )}
                                    <span className="capitalize">{project.title}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Group heading="Experience" className="text-xs font-medium text-neutral-500 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:border-y [&_[cmdk-group-heading]]:border-neutral-800 [&_[cmdk-list]]:px-2 [&_[cmdk-list]]:py-2">
                            {experiences.map((exp, idx) => (
                                <Command.Item
                                    key={idx}
                                    value={exp.company}
                                    onSelect={() => runCommand(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }))}
                                    className="relative flex cursor-pointer select-none items-center px-2 py-2.5 text-sm outline-none aria-selected:bg-white/5 aria-selected:text-white"
                                >
                                    <Map className="mr-2 h-4 w-4 opacity-70" />
                                    <span className="capitalize">{exp.company}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        {search.length > 0 && (
                            <Command.Group heading="Tech Stack" className="text-xs font-medium text-neutral-500 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:border-y [&_[cmdk-group-heading]]:border-neutral-800 [&_[cmdk-list]]:px-2 [&_[cmdk-list]]:py-2">
                                {Logos.map((tech, idx) => (
                                    <Command.Item
                                        key={`tech-${idx}`}
                                        value={tech.name}
                                        onSelect={() => runCommand(() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' }))}
                                        className="relative flex cursor-pointer select-none items-center justify-between rounded px-2 py-2.5 text-sm outline-none aria-selected:bg-white/5 aria-selected:text-white"
                                    >
                                        <div className="flex items-center">
                                            <div className="mr-2 h-4 w-4 opacity-80 flex items-center justify-center">
                                                {typeof tech.url === 'string' ? (
                                                    <Image src={tech.url} alt={tech.name} width={16} height={16} className="object-cover" unoptimized />
                                                ) : (
                                                    <div className="w-full h-full">{tech.url}</div>
                                                )}
                                            </div>
                                            <span className="capitalize">{tech.name}</span>
                                        </div>
                                        <span className="text-[10px] text-neutral-500">{"Yes! I know that :)"}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}

                        <Command.Group heading="Socials & Links" className="text-xs font-medium text-neutral-500 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:border-y [&_[cmdk-group-heading]]:border-neutral-800 [&_[cmdk-list]]:px-2 [&_[cmdk-list]]:py-2">
                            {details.map((detail, idx) => {
                                const Icon = detail.logo;
                                return (
                                    <Command.Item
                                        key={idx}
                                        value={detail.label}
                                        onSelect={() => runCommand(() => window.open(detail.link, '_blank'))}
                                        className="relative flex cursor-pointer select-none items-center px-2 py-2.5 text-sm outline-none aria-selected:bg-white/5 aria-selected:text-white"
                                    >
                                        <Icon className="mr-2 h-4 w-4 opacity-70" />
                                        <span className="capitalize">{detail.label.toLowerCase()}</span>
                                    </Command.Item>
                                );
                            })}
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
