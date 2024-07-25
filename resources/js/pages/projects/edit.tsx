import { Project, Tag } from '@/types'

import ProjectForm from './form'

export default async function ProjectEditPage({
    tags,
    project
}: {
    tags: Tag[]
    project?: Project
}) {
    return (
        <>
            <div className='mb-6 flex w-full flex-wrap items-center justify-between gap-4'>
                <h2 className='text-2xl font-semibold'>Edit Project</h2>
            </div>
            <ProjectForm tags={tags} project={project} />
        </>
    )
}
