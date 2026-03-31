'use client';

import { useState, useEffect } from 'react';
import { Search, Keyboard, Sun, Moon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import TypingGame from '../ui/TypingGame';
import { useTheme } from 'next-themes';

export default function Navbar() {
    const [typingOpen, setTypingOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-secondary-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 h-16 flex items-center justify-between border-x border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-3 cursor-pointer overflow-hidden" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold border border-neutral-200 dark:border-neutral-700 flex-shrink-0 text-neutral-800 dark:text-white">
                            A
                        </div>
                        <span className="font-medium text-sm text-neutral-800 dark:text-neutral-200 truncate">Anjan Suman</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 pl-4">
                        {/* Theme Toggle button */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex items-center justify-center h-[34px] aspect-square rounded bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-colors text-xs text-neutral-500 dark:text-neutral-400 group"
                            title="Toggle theme"
                        >
                            {mounted ? (
                                theme === 'dark' ? (
                                    <Sun className="w-3.5 h-3.5 group-hover:text-neutral-300 transition-colors" />
                                ) : (
                                    <Moon className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
                                )
                            ) : (
                                <div className="w-3.5 h-3.5" />
                            )}
                        </button>

                        {/* Typing game button */}
                        <button
                            onClick={() => setTypingOpen(true)}
                            className="flex items-center justify-center h-[34px] aspect-square rounded bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-colors text-xs text-neutral-600 dark:text-neutral-400 group"
                            title="Typing game"
                        >
                            <Keyboard className="w-3.5 h-3.5 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors" />
                        </button>

                        {/* Search button */}
                        <button
                            onClick={() => window.dispatchEvent(new Event('open-cmdk'))}
                            className="flex items-center h-[34px] gap-2 px-3 rounded bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-colors text-xs text-neutral-600 dark:text-neutral-400 group"
                        >
                            <Search className="w-3.5 h-3.5 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors" />
                            <span className="hidden sm:inline group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">Press</span>
                            <kbd className="hidden sm:flex font-sans font-medium px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">⌘K</kbd>
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {typingOpen && <TypingGame open={typingOpen} onClose={() => setTypingOpen(false)} />}
            </AnimatePresence>
        </>
    );
}