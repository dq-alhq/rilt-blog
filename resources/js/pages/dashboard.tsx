import { buttonVariants, Card, Link } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { Head } from '@inertiajs/react'
import { BookCopyIcon, BookIcon } from 'lucide-react'

export default function DashboardPage(props: any) {
    const { article_count, project_count, latest_article, latest_project } = props
    return (
        <>
            <Head title='Dashboard' />
            <main className='grid md:grid-cols-2 gap-6'>
                <Card>
                    <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <Card.Title className='font-medium'>Artikel Dibuat</Card.Title>
                        <BookIcon className='size-6 text-muted-foreground' />
                    </Card.Header>
                    <Card.Content>
                        <div className='text-2xl font-bold'>{article_count} Artikel</div>
                        <p className='text-xs text-muted-foreground'>
                            Update terakhir {latest_article}
                        </p>
                    </Card.Content>
                    <Card.Footer>
                        <Link
                            href={route('articles.table')}
                            className={buttonVariants({ size: 'sm' })}
                        >
                            Lihat semua
                        </Link>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <Card.Title className='font-medium'>Project Dibuat</Card.Title>
                        <BookCopyIcon className='size-6 text-muted-foreground' />
                    </Card.Header>
                    <Card.Content>
                        <div className='text-2xl font-bold'>{project_count} Project</div>
                        <p className='text-xs text-muted-foreground'>
                            Update terakhir {latest_project}
                        </p>
                    </Card.Content>
                    <Card.Footer>
                        <Link
                            href={route('projects.table')}
                            className={buttonVariants({ size: 'sm' })}
                        >
                            Lihat semua
                        </Link>
                    </Card.Footer>
                </Card>
            </main>
        </>
    )
}

DashboardPage.layout = (page: any) => <UserLayout children={page} />
