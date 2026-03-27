'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Map, Code, User, FileText, Smartphone, Mail, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // Also expose a global method or custom event to open it from Navbar
    useEffect(() => {
        const handleOpenCmdk = () => setOpen(true);
        window.addEventListener('open-cmdk', handleOpenCmdk);
        return () => window.removeEventListener('open-cmdk', handleOpenCmdk);
    }, []);

    const runCommand = (command: () => unknown) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded border border-neutral-800 bg-neutral-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <Command
                    className="flex h-full w-full flex-col bg-transparent text-neutral-100"
                    loop
                >
                    <div className="flex items-center border-b border-neutral-800 px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-500" />
                        <Command.Input
                            autoFocus
                            placeholder="Type a command or search..."
                            className="flex h-12 w-full rounded bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            onClick={() => setOpen(false)}
                            className="ml-2 rounded p-1 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 [scrollbar-width:none]">
                        <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                            No results found.
                        </Command.Empty>
                        <Command.Group heading="Navigation" className="text-xs font-medium text-neutral-500 [&_[cmdk-list]]:mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
                                className="relative flex cursor-pointer select-none items-center rounded px-2 py-2.5 text-sm outline-none aria-selected:bg-neutral-800 aria-selected:text-white"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>Overview</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }))}
                                className="relative flex cursor-pointer select-none items-center rounded px-2 py-2.5 text-sm outline-none aria-selected:bg-neutral-800 aria-selected:text-white"
                            >
                                <Map className="mr-2 h-4 w-4" />
                                <span>Experience</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}
                                className="relative flex cursor-pointer select-none items-center rounded px-2 py-2.5 text-sm outline-none aria-selected:bg-neutral-800 aria-selected:text-white"
                            >
                                <Code className="mr-2 h-4 w-4" />
                                <span>Projects</span>
                            </Command.Item>
                        </Command.Group>
                        <Command.Separator className="my-1 h-px bg-neutral-800" />
                        <Command.Group heading="Socials" className="text-xs font-medium text-neutral-500 [&_[cmdk-list]]:mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => window.open('https://github.com/Anjansuman', '_blank'))}
                                className="relative flex cursor-pointer select-none items-center rounded px-2 py-2.5 text-sm outline-none aria-selected:bg-neutral-800 aria-selected:text-white"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>GitHub</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.open('mailto:anjansuman@example.com', '_blank'))}
                                className="relative flex cursor-pointer select-none items-center rounded px-2 py-2.5 text-sm outline-none aria-selected:bg-neutral-800 aria-selected:text-white"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Email Me</span>
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
