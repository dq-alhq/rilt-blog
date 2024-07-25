import { TagBadge } from '@/components/tag-links'
import { Card, Link } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import { Article, Project } from '@/types'

export function ItemCard({
    item,
    type
}: {
    item: Article | Project
    type: 'article' | 'project'
}) {
    return (
        <Card>
            <Card.Header>
                <div className='flex gap-2 mb-2'>
                    {item.tags?.map((tag) => <TagBadge key={tag.id} tag={tag} />)}
                </div>
                <Card.Title className='text-xl font-semibold leading-none tracking-tight line-clamp-1 overflow-visible'>
                    <Link href={`/${type}s/${item.slug}`}>{item.title}</Link>
                </Card.Title>
                <Card.Description className='line-clamp-2 h-10'>
                    {item.description}
                </Card.Description>
            </Card.Header>
            <Card.Footer className='flex justify-between items-center font-semibold text-muted-foreground text-xs'>
                <span>{item.user?.name}</span>
                <span>{formatDate(item.created_at)}</span>
            </Card.Footer>
        </Card>
    )
}
