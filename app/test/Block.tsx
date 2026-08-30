import { cn } from '@/lib/utils';

interface BlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function Block({ children, className }: BlockProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 dark:border-neutral-800',
        'bg-white dark:bg-neutral-900',
        'p-4 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
