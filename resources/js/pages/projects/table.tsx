import { List, SearchItem } from '@/components/item-list'
import { Project } from '@/types'

interface Props {
    projects: Project[]
    page: number
    total: number
}

export default async function ProjectListPage({ projects, total, page }: Props) {
    return (
        <>
            <div className='mb-6 flex w-full flex-wrap items-center justify-between gap-4'>
                <h2 className='text-2xl font-semibold'>Project</h2>
                <SearchItem />
            </div>
            {projects.length > 0 ? (
                <List type='project' page={page} total={total} items={projects} />
            ) : (
                <div>Belum ada Project</div>
            )}
        </>
    )
}
