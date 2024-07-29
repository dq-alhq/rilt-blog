import { Markdown } from '@/components/markdown'
import { TagBadge } from '@/components/tag-links'
import TableOfContents from '@/components/toc'
import { Avatar, Button, buttonVariants, Card } from '@/components/ui'
import AppLayout from '@/layouts/app-layout'
import { formatDate, getInitials } from '@/lib/utils'
import { Tag } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

export default function ArticleShow(props: any) {
    const { article: article, next_article, prev_article } = props
    console.log(article)
    return (
        <>
            <Head title={article.title} />
            <main className='container flex flex-col-reverse lg:flex-row my-8 md:my-16 gap-16'>
                <div className='lg:w-2/3 w-full'>
                    {article.project && (
                        <>
                            <span className='text-sm'>Chapter {article.chapter} - </span>
                            <Link
                                href={route('projects.show', article.project.slug)}
                                className='text-sm text-primary font-medium'
                            >
                                Project: {article.project.title}
                            </Link>
                        </>
                    )}
                    <div className='text-muted-foreground text-sm my-4'>
                        {formatDate(article.created_at)}
                    </div>
                    <div className='text-2xl md:text-4xl lg:text-5xl font-bold'>
                        {article.title}
                    </div>
                    <div className='md:my-4 text-sm md:text-base'>
                        {article.description}
                    </div>
                    <div className='flex gap-1 my-4'>
                        {article.tags.map((tag: Tag) => (
                            <TagBadge key={tag.id} tag={tag} />
                        ))}
                    </div>
                    <Markdown content={article.body} className='my-8 md:max-w-4xl' />
                </div>
                <div className='lg:w-1/3 lg:sticky top-32 lg:max-h-20'>
                    <TableOfContents text={article.body} />
                    <Link href={route('articles.edit', article.slug)}>
                        <Card className='mt-2 rounded-lg'>
                            <Card.Header className='flex flex-row items-center gap-4 p-4'>
                                <Avatar
                                    size='xl'
                                    initials={getInitials(article.author?.name)}
                                    src={article.author?.avatar}
                                />
                                <div>
                                    <Card.Title>{article.author.name}</Card.Title>
                                    <Card.Description>Author</Card.Description>
                                </div>
                            </Card.Header>
                        </Card>
                    </Link>
                </div>
            </main>
            <div className='container w-full flex items-center justify-between lg:justify-start mt-8 gap-4'>
                {prev_article ? (
                    <Link
                        href={route('articles.show', prev_article.slug)}
                        className={buttonVariants({ variant: 'outline' })}
                    >
                        <ChevronsLeft /> Chapter {prev_article.chapter}
                    </Link>
                ) : (
                    <Button isDisabled variant='outline' size='icon'>
                        <ChevronsLeft />
                    </Button>
                )}
                {next_article ? (
                    <Link
                        href={route('articles.show', next_article.slug)}
                        className={buttonVariants({ variant: 'outline' })}
                    >
                        Chapter {next_article.chapter} <ChevronsRight />
                    </Link>
                ) : (
                    <Button isDisabled variant='outline' size='icon'>
                        <ChevronsRight />
                    </Button>
                )}
            </div>
        </>
    )
}

ArticleShow.layout = (page: any) => <AppLayout children={page} />
