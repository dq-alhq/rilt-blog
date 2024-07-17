import { Link } from '@/components/ui'
import { cn } from '@/lib/utils'
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
        <Link
            {...props}
            className={cn(
                'inline-flex items-center rounded px-3 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
                active
                    ? 'bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                className
            )}
        >
            {children}
        </Link>
    )
}
