import { TagBadge } from '@/components/tag-links'
import { buttonVariants, Card } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import { Project, Tag } from '@/types'
import { Link } from '@inertiajs/react'

export default function ProjectShow({ project }: { project: Project }) {
    return (
        <main className='container grid my-8 md:my-14'>
            <div className='w-full'>
                <div className='text-2xl md:text-4xl font-bold'>{project.title}</div>
                <div className='md:my-4 text-sm md:text-base'>{project.description}</div>
                <div className='my-4 text-sm flex md:flex-row flex-col-reverse gap-2 md:justify-between md:items-center'>
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                            {project.tags.map((tag: Tag) => (
                                <TagBadge key={tag.id} tag={tag} />
                            ))}
                        </div>
                    </div>
                    <div className='text-muted-foreground'>
                        Published {formatDate(project.created_at)}
                    </div>
                </div>
                <div className='my-8'>
                    <h1 className='text-xl font-semibold mb-4'>Daftar Chapter</h1>
                    <div className='max-w-2xl grid gap-2'>
                        {project.articles.map((item) => (
                            <div key={item.id} className='w-full flex gap-2'>
                                <Link
                                    href={route('articles.show', item.slug)}
                                    className={buttonVariants({ variant: 'outline' })}
                                >
                                    {item.chapter}
                                </Link>
                                <Link
                                    href={route('articles.show', item.slug)}
                                    className='w-full'
                                >
                                    <Card>
                                        <Card.Header className='p-3'>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Description>
                                                {item.description}
                                            </Card.Description>
                                        </Card.Header>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
