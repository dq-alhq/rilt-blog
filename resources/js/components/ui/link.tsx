import { cn } from '@/lib/utils'
import * as Primitive from 'react-aria-components'

const Link = (props: Primitive.LinkProps) => (
    <Primitive.Link {...props} className={cn('outline-none', props.className)} />
)

export { Link }
