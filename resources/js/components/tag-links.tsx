import React from 'react'

import { badgeVariants, buttonVariants, Link, Skeleton, Tooltip } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Tag } from '@/types'

export const TagBadge = ({ tag }: { tag: Tag }) => {
    return (
        <Link
            // href={route('tags.show', tag)}
            className={cn(
                badgeVariants({ variant: 'outline' }),
                'hover:bg-primary hover:text-primary-foreground transition'
            )}
        >
            {tag.name}
        </Link>
    )
}

export const TagButton = ({ title }: { title: string }) => {
    return (
        <Tooltip>
            <Tooltip.Trigger>
                <Link
                    // href={`${pathname}?${createQuery('tag', slugify(title))}`}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'group h-14 w-14'
                    )}
                >
                    <img
                        // src={`/svgs/${slugify(title)}.svg`}
                        alt={title}
                        width={32}
                        height={32}
                        className='h-6 w-6 transition duration-300 group-hover:scale-125 dark:invert'
                    />
                </Link>
            </Tooltip.Trigger>
            <Tooltip.Content>{title}</Tooltip.Content>
        </Tooltip>
    )
}

export const TagLinks = () => {
    return (
        <div className='mt-10 flex max-w-xl flex-wrap items-center gap-2'>
            <TagButton title='HTML' />
        </div>
    )
}

export const TagLinksSkeleton = () => {
    return (
        <div className='mt-10 flex max-w-xl flex-wrap items-center gap-2'>
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
            <Skeleton className='h-14 w-14' />
        </div>
    )
}
