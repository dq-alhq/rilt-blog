import { ItemCard } from '@/components/item-card'
import { Pagination } from '@/components/pagination'
import { TagLinks } from '@/components/tag-links'
import { Project } from '@/types'

interface Props {
    projects: Project[]
    page: number
    total: number
}

export default function ArticleIndex({ projects, page, total }: Props) {
    return (
        <main>
            <div className='container mt-12'>
                <h1 className='text-2xl font-bold text-foreground sm:text-3xl lg:text-5xl'>
                    Project
                </h1>
                <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                    Selamat datang di halaman project kami! Mari belajar pemrograman web
                    dengan membuat project
                </p>
                <TagLinks />
                <div className='py-8 sm:py-16'>
                    <div className='grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12'>
                        {projects.map((project: Project) => (
                            <ItemCard key={project.id} item={project} type='article' />
                        ))}
                    </div>
                    {projects.length > 9 && (
                        <div className='py-3'>
                            <Pagination
                                current={Number(page)}
                                per_page={9}
                                total={total}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
