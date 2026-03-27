'use client';

import { Search } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full bg-secondary-dark/80 backdrop-blur-md border-b border-neutral-800">
            <div className="mx-auto w-full max-w-3xl px-6 h-16 flex items-center justify-between border-x border-neutral-800">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center text-sm font-semibold border border-neutral-700">
                        A
                    </div>
                    <span className="font-medium text-sm text-neutral-200">Anjan Suman</span>
                </div>
                
                <button 
                    onClick={() => window.dispatchEvent(new Event('open-cmdk'))}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 transition-colors text-xs text-neutral-400 group"
                >
                    <Search className="w-3 h-3 group-hover:text-neutral-300 transition-colors" />
                    <span className="group-hover:text-neutral-300 transition-colors">Press</span>
                    <kbd className="font-sans font-medium px-1.5 py-0.5 rounded border border-neutral-700 bg-neutral-900 group-hover:text-neutral-200">⌘K</kbd>
                </button>
            </div>
        </header>
    );
}