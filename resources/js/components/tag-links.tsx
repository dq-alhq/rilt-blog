import React from 'react'

import { Badge, Button, Tooltip } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Tag } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { Collection } from 'react-aria-components'

export const TagBadge = ({ tag }: { tag: Tag }) => {
    return (
        <Badge
            onClick={() => {
                router.get(
                    location.href,
                    { tag: tag.slug, page: 1 },
                    { replace: true, preserveState: true }
                )
            }}
            className={cn(
                'hover:bg-primary hover:text-primary-foreground transition cursor-pointer'
            )}
        >
            {tag.name}
        </Badge>
    )
}

export const TagButton = ({ tag }: { tag: Tag }) => {
    return (
        <Tooltip>
            <Button
                onPress={() => {
                    router.get(
                        location.href,
                        { tag: tag.slug, page: 1 },
                        { replace: true, preserveState: true }
                    )
                }}
                variant='outline'
                className={cn(
                    'group h-14 w-14',
                    location.href.includes(tag.slug) &&
                        'border-primary ring-primary/20 ring'
                )}
            >
                <img
                    src={`/svgs/${tag.slug}.svg`}
                    alt={tag.name}
                    width={32}
                    height={32}
                    className='h-6 w-6 transition duration-300 group-hover:scale-125 dark:invert'
                />
            </Button>
            <Tooltip.Content>{tag.name}</Tooltip.Content>
        </Tooltip>
    )
}

export const TagLinks = () => {
    const { tags_global } = usePage<{ tags_global: Tag[] }>().props
    return (
        <div className='flex max-w-xl flex-wrap items-center gap-2'>
            <Collection items={tags_global}>
                {(tag) => <TagButton key={tag.id} tag={tag} />}
            </Collection>
        </div>
    )
}
