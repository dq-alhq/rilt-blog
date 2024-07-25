import { TagBadge } from '@/components/tag-links'
import { Link } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import { Project, Tag } from '@/types'
import { Collection } from 'react-aria-components'

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
                    <Collection items={project?.articles} aria-label='Article List'>
                        {(item) => (
                            <div className='flex gap-2 max-w-2xl'>
                                <Link
                                    href={`/articles/${item.slug}`}
                                    className='p-4 shadow-sm rounded-lg hover:bg-primary/70 hover:text-primary-foreground pressed:bg-primary transition-colors pressed:text-primary-foreground text-xl flex justify-center items-center w-12 border h-full'
                                >
                                    {item.chapter}
                                </Link>
                                <div
                                    key={item.id}
                                    className='p-4 rounded-lg border shadow-sm'
                                >
                                    <Link
                                        href={`/articles/${item.slug}`}
                                        className='text-xl mb-1 font-semibold leading-none tracking-tight line-clamp-1'
                                    >
                                        {item.title}
                                    </Link>
                                    <p className='line-clamp-1 text-muted-foreground text-sm'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </Collection>
                </div>
            </div>
        </main>
    )
}
