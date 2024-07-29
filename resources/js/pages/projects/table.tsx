import { List } from '@/components/item-list'
import { Search } from '@/components/search'
import { buttonVariants, Card, Link } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { Head } from '@inertiajs/react'
import { BookPlusIcon } from 'lucide-react'

export default function ProjectsTable(props: any) {
    const { data: projects, meta, links } = props.projects
    return (
        <Card>
            <Head title='My Projects' />
            <Card.Header className='flex flex-col lg:flex-row w-full flex-wrap items-center justify-between gap-4'>
                <Card.Title className='text-2xl font-semibold'>Project</Card.Title>
                <div className='flex items-center gap-2'>
                    <Search />
                    <Link href={route('projects.create')} className={buttonVariants()}>
                        <BookPlusIcon /> Buat Project
                    </Link>
                </div>
            </Card.Header>
            {projects.length > 0 ? (
                <List type='project' items={projects} meta={meta} links={links} />
            ) : (
                <div>Belum ada Project</div>
            )}
        </Card>
    )
}

ProjectsTable.layout = (page: any) => <UserLayout children={page} />
