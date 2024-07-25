import { Markdown } from '@/components/markdown'
import { TagBadge } from '@/components/tag-links'
import TableOfContents from '@/components/toc'
import { formatDate } from '@/lib/utils'
import { Article, Tag } from '@/types'

export default function ArticleShow({ article }: { article: Article }) {
    return (
        <main className='container grid grid-cols-1 lg:grid-cols-3 my-8 md:my-14 gap-16'>
            <div className='lg:col-span-2 w-full lg:w-auto'>
                <div className='text-2xl md:text-4xl font-bold'>{article.title}</div>
                <div className='md:my-4 text-sm md:text-base'>{article.description}</div>
                <div className='my-4 text-sm flex md:flex-row flex-col-reverse gap-2 md:justify-between md:items-center'>
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                            {article.tags.map((tag: Tag) => (
                                <TagBadge key={tag.id} tag={tag} />
                            ))}
                        </div>
                    </div>
                    <div className='text-muted-foreground'>
                        Published {formatDate(article.created_at)}
                    </div>
                </div>
                <Markdown content={article.content} className='my-8 md:max-w-4xl' />
            </div>
            <div className='md:col-span-1 hidden md:block sticky top-32 max-h-20'>
                <TableOfContents text={article.content} />
            </div>
        </main>
    )
}
