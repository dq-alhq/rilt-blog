import { cn } from '@/lib/utils'
import * as icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
    icon: keyof typeof icons
    className?: string
}

export const Icon = ({ icon, className, ...props }: IconProps) => {
    const LucideIcon = icons[icon] as React.FC<LucideProps>
    if (!LucideIcon) return null
    return <LucideIcon className={cn('size-5', className)} {...props} />
}
