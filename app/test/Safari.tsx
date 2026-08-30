'use client';

import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

interface SafariProps {
  title?: string;
  url?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Safari({ title = 'Safari', url = 'localhost:3000', children, className }: SafariProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 shadow-lg', className)}>
      <div className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-2">
            <div className="text-xs text-neutral-600 dark:text-neutral-400 text-center">{title}</div>
          </div>
        </div>
        <div className="mt-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-xs text-neutral-600 dark:text-neutral-400">{url}</span>
        </div>
      </div>
      <div className="p-4 min-h-48 bg-white dark:bg-neutral-950">{children}</div>
    </div>
  );
}
