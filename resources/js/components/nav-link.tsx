import { Link } from '@/components/ui'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LinkProps } from 'react-aria-components'

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: LinkProps & {
    active: boolean
}) {
    return (
        <div className='relative w-full'>
            <Link
                {...props}
                className={cn(
                    'inline-flex whitespace-nowrap w-full items-center rounded gap-2 px-3 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
                    active ? 'text-primary' : 'text-foreground hover:text-primary',
                    className
                )}
            >
                {children}
            </Link>
            {active && (
                <motion.span
                    className={cn(
                        'absolute rounded bg-primary',
                        // horizontal
                        'inset-x-0 -bottom-4 h-0.5 w-full'
                    )}
                    layoutId='current-selected'
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
            )}
        </div>
    )
}
