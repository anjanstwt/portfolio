'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Timer, Loader2 } from 'lucide-react';

const TIMES = [15, 30, 60, 120];

const FALLBACKS = [
    "The best way to get started is to quit talking and begin doing. Don't let yesterday take up too much of today. Great things never came from comfort zones. Push yourself because no one else will do it for you. There is no such thing as failure, only feedback. Your only limit is you. Success is not for the fast, it is for the steady.",
    "The secret of getting ahead is getting started. Break large goals into small manageable steps. Success is the sum of small efforts repeated day in and day out. Never give up on something you really believe in. The difference between winning and losing is most often not quitting. Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
    "You are never too old to set another goal or dream a new dream. The only way to do great work is to love what you do. Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish. Dream big and dare to fail. Quality is not an act, it is a habit. First, have a definite, clear practical ideal; a goal, an objective.",
    "Success is not final and failure is not fatal. It is the courage to continue that counts. Every adversity carries with it the seed of an equivalent or greater benefit. Think big and don't stop believing in yourself. We are what we repeatedly do. Excellence, then, is not an act, but a habit. Believe you can and you're halfway there.",
];

async function fetchLongText(): Promise<string> {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random/10');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            const quotes = data.map((d: { quote?: string }) => d.quote).filter(Boolean);
            if (quotes.length > 0) return quotes.join(' ');
        }
        throw new Error('empty');
    } catch {
        return FALLBACKS.slice(0, 3).join(' ');
    }
}

type CharState = 'idle' | 'correct' | 'incorrect';

interface GameState {
    text: string;
    chars: { char: string; state: CharState }[];
    typed: string;
    cursor: number;
}

export default function TypingGame({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [timeLimit, setTimeLimit] = useState(30);
    const [timeLeft, setTimeLeft] = useState(30);
    const [game, setGame] = useState<GameState | null>(null);
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [scrollOffset, setScrollOffset] = useState(0);
    const rawTextRef = useRef<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timerRef = useRef(timeLimit);
    const correctRef = useRef(0);  // total correct keystrokes
    const totalRef = useRef(0);    // total keystrokes (every key press)
    const displayRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const LINE_HEIGHT = 40; // px — matches text-lg leading-[40px]
    const VISIBLE_LINES = 3;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const buildGame = (text: string): GameState => ({
        text,
        chars: text.split('').map((c: string) => ({ char: c, state: 'idle' as CharState })),
        typed: '',
        cursor: 0,
    });

    // Reset scroll on new game
    const resetState = useCallback((limit: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        timerRef.current = limit;
        correctRef.current = 0;
        totalRef.current = 0;
        setStarted(false);
        setFinished(false);
        setWpm(0);
        setAccuracy(100);
        setTimeLeft(limit);
        setScrollOffset(0);
        if (rawTextRef.current) {
            setGame(buildGame(rawTextRef.current));
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, []);

    // Full reset: fetches a new quote then builds game
    const reset = useCallback(async (limit?: number) => {
        const l = limit ?? timeLimit;
        if (intervalRef.current) clearInterval(intervalRef.current);
        timerRef.current = l;
        correctRef.current = 0;
        totalRef.current = 0;
        setStarted(false);
        setFinished(false);
        setWpm(0);
        setAccuracy(100);
        setTimeLeft(l);
        setGame(null);
        setScrollOffset(0);
        setLoading(true);
        const text = await fetchLongText();
        rawTextRef.current = text;
        setGame(buildGame(text));
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 50);
    }, [timeLimit]);

    useEffect(() => {
        if (open) reset();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [open]);

    // Time change: no refetch — just reset progress with same quote
    const handleTimeChange = (t: number) => {
        setTimeLimit(t);
        resetState(t);
    };

    useEffect(() => {
        if (started && !finished) {
            intervalRef.current = setInterval(() => {
                timerRef.current -= 1;
                setTimeLeft(timerRef.current);
                // Update live wpm every tick
                const elapsed = timeLimit - timerRef.current;
                if (elapsed > 0) {
                    setWpm(Math.round((correctRef.current / 5 / elapsed) * 60));
                }
                if (timerRef.current <= 0) {
                    clearInterval(intervalRef.current!);
                    endGame();
                }
            }, 1000);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [started, finished]);

    const endGame = () => {
        setFinished(true);
        const elapsed = timeLimit - timerRef.current;
        // WPM: correct chars / 5 / elapsed minutes
        const finalWpm = Math.round((correctRef.current / 5 / Math.max(elapsed, 1)) * 60);
        const finalAcc = totalRef.current > 0 ? Math.round((correctRef.current / totalRef.current) * 100) : 100;
        setWpm(finalWpm);
        setAccuracy(finalAcc);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (finished || !game) return;
        const typed = e.target.value;
        const prevLen = game.typed.length;

        // Start timer on first keystroke
        if (!started && typed.length > 0) setStarted(true);

        // Count keystrokes: only count forward typing (not backspace)
        if (typed.length > prevLen) {
            totalRef.current += 1;
            const i = typed.length - 1;
            if (typed[i] === game.chars[i]?.char) {
                correctRef.current += 1;
            }
        }

        const cursor = typed.length;

        setGame(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                typed,
                cursor,
                chars: prev.chars.map((c, i) => ({
                    ...c,
                    state: i < typed.length
                        ? typed[i] === c.char ? 'correct' : 'incorrect'
                        : 'idle',
                })),
            };
        });

        // Auto-finish when all chars typed
        if (cursor >= game.text.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            endGame();
        }
    };

    const liveWpm = started && !finished && timeLeft < timeLimit
        ? Math.round((correctRef.current / 5 / Math.max(timeLimit - timeLeft, 1)) * 60)
        : wpm;

    const liveAccuracy = game && game.typed.length > 0
        ? Math.round((game.chars.filter((c, i) => i < game.typed.length && c.state === 'correct').length / game.typed.length) * 100)
        : 100;

    // Auto-scroll: use offsetTop for stable position (unaffected by transforms)
    useEffect(() => {
        if (!cursorRef.current || !displayRef.current) return;
        const cursorTop = cursorRef.current.offsetTop;
        const currentLine = Math.floor(cursorTop / LINE_HEIGHT);
        // Keep cursor on 2nd visible line
        const targetLine = Math.max(0, currentLine - 1);
        setScrollOffset(targetLine * LINE_HEIGHT);
    }, [game?.cursor]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center transition-all bg-black/10 backdrop-blur-[2px]" onClick={onClose}>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-2xl rounded-[6px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#09090b] shadow-2xl"
                onClick={e => e.stopPropagation()}
                data-lenis-prevent
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-5 py-3">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">type</span>
                        <div className="flex items-center gap-1">
                            {TIMES.map(t => (
                        <button
                                    key={t}
                                    onClick={() => handleTimeChange(t)}
                                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${timeLimit === t
                                        ? 'text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800'
                                        : 'text-neutral-500 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-400 border border-transparent'
                                        }`}
                                >
                                    {t}s
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => reset()} className="p-1.5 rounded text-neutral-600 hover:text-neutral-300 hover:bg-neutral-800 transition-colors" title="Restart">
                            <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={onClose} className="p-1.5 rounded text-neutral-600 hover:text-neutral-300 hover:bg-neutral-800 transition-colors">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="flex items-center gap-5 px-5 py-2.5 border-b border-neutral-200 dark:border-neutral-800/50">
                    <div className="flex items-center gap-1.5">
                        <Timer className="w-3 h-3 text-neutral-600" />
                        <span className={`font-mono text-sm font-semibold tabular-nums transition-colors ${timeLeft <= 5 ? 'text-red-400' : timeLeft <= 10 ? 'text-yellow-400/80' : 'text-neutral-300'}`}>
                            {timeLeft}
                        </span>
                    </div>
                    <AnimatePresence>
                        {started && !finished && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-5">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider">wpm</span>
                                    <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-300">{liveWpm}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-neutral-500 dark:text-neutral-600 uppercase tracking-wider">acc</span>
                                    <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-300">{liveAccuracy}%</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Progress bar */}
                    <div className="ml-auto h-0.5 w-32 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        <motion.div
                            className="h-full bg-neutral-500 rounded-full"
                            animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
                            transition={{ duration: 0.9, ease: 'linear' }}
                        />
                    </div>
                </div>

                {/* Game area */}
                <div className="px-6 pt-5 pb-6 min-h-[200px]" onClick={() => inputRef.current?.focus()}>
                    <AnimatePresence mode="wait">
                        {finished ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center justify-center gap-6 py-6"
                            >
                                <p className="text-[10px] uppercase tracking-widest text-neutral-600">Results</p>
                                <div className="flex items-end gap-12">
                                    <div className="text-center">
                                        <p className="font-mono text-5xl font-bold text-neutral-900 dark:text-white tabular-nums">{wpm}</p>
                                        <p className="text-[10px] text-neutral-600 mt-1.5 uppercase tracking-widest">wpm</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-mono text-3xl font-semibold text-neutral-400 tabular-nums">{accuracy}%</p>
                                        <p className="text-[10px] text-neutral-600 mt-1.5 uppercase tracking-widest">accuracy</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => reset()}
                                    className="flex items-center gap-2 mt-1 px-4 py-2 rounded-[4px] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    try again
                                </button>
                            </motion.div>
                        ) : loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center py-16"
                            >
                                <Loader2 className="w-4 h-4 text-neutral-600 animate-spin" />
                            </motion.div>
                        ) : game ? (
                            <motion.div
                                key="typing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {/* Clipped viewport */}
                                <div
                                    className="relative overflow-hidden"
                                    style={{ height: `${LINE_HEIGHT * VISIBLE_LINES}px` }}
                                    onClick={() => inputRef.current?.focus()}
                                >
                                    <div
                                        ref={displayRef}
                                        className="font-mono text-lg leading-[40px] tracking-wide select-none cursor-text relative"
                                        style={{
                                            transform: `translateY(-${scrollOffset}px)`,
                                            transition: 'transform 0.15s ease',
                                        }}
                                    >
                                        {game.chars.map((c, i) => {
                                            const isCursor = i === game.cursor;
                                            return (
                                                <span
                                                    key={i}
                                                    ref={isCursor ? cursorRef : undefined}
                                                    className="relative"
                                                >
                                                    {isCursor && (
                                                        <span className="absolute -left-px top-0.5 bottom-0.5 w-0.5 bg-neutral-900 dark:bg-neutral-300 rounded-full animate-[blink_1s_step-end_infinite]" />
                                                    )}
                                                    <span
                                                        className={
                                                            c.state === 'correct'
                                                                ? 'text-neutral-900 dark:text-neutral-200'
                                                                : c.state === 'incorrect'
                                                                    ? c.char === ' '
                                                                        ? 'bg-red-400/30 text-red-500 dark:text-red-400'
                                                                        : 'text-red-500 dark:text-red-400'
                                                                    : 'text-neutral-400 dark:text-neutral-600'
                                                        }
                                                    >
                                                        {c.char}
                                                    </span>
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Hidden actual input */}
                                <input
                                    ref={inputRef}
                                    value={game.typed}
                                    onChange={handleInput}
                                    disabled={finished}
                                    className="sr-only"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                />
                                {!started && (
                                    <p className="text-[11px] text-neutral-700 text-center mt-4">
                                        click here and start typing
                                    </p>
                                )}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
