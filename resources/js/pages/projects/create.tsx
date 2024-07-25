import { Project, Tag } from '@/types'

import ProjectForm from './form'

export default function ProjectCreatePage({
    tags,
    project
}: {
    tags: Tag[]
    project?: Project
}) {
    return (
        <>
            <div className='mb-6 flex w-full flex-wrap items-center justify-between gap-4'>
                <h2 className='text-2xl font-semibold'>Buat Project Baru</h2>
            </div>
            <ProjectForm tags={tags} project={project} />
        </>
    )
}
