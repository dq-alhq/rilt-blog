import { cn } from '@/lib/utils'

export function HR({ children, className, ...props }: any) {
    return (
        <div
            {...props}
            className={cn(
                'py-3 pointer-events-none flex items-center text-sm text-muted-foreground before:flex-1 before:border-t before:border before:me-2 after:flex-1 after:border-t after:border after:ms-2',
                className
            )}
        >
            {children}
        </div>
    )
}
