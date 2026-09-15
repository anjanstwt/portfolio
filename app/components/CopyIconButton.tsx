"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyIconButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard access denied, ignore
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy"
            className="text-steel hover:text-neutral-100 transition-colors"
        >
            {copied ? <FiCheck /> : <FiCopy />}
        </button>
    );
}
