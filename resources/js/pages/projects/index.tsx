import { ItemCard } from '@/components/item-card'
import { Pagination } from '@/components/pagination'
import { Search } from '@/components/search'
import { TagLinks } from '@/components/tag-links'
import AppLayout from '@/layouts/app-layout'
import { Project } from '@/types'

export default function ProjectIndex(props: any) {
    const { data: projects, meta, links } = props.projects
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
                <div className='flex flex-col lg:flex-row gap-8 justify-between mt-10'>
                    <TagLinks />
                    <Search />
                </div>
                <div className='py-8 sm:py-16'>
                    <div className='grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12'>
                        {projects?.map((project: Project, index: number) => (
                            <ItemCard key={index} item={project} type='project' />
                        ))}
                    </div>
                    {projects?.length >= 9 && (
                        <div className='py-3'>
                            <Pagination meta={meta} links={links} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

ProjectIndex.layout = (page: any) => <AppLayout children={page} />
