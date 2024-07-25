import { buttonVariants, Card, Link } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { Head } from '@inertiajs/react'
import { BookCopyIcon, BookIcon } from 'lucide-react'

export default function DashboardPage() {
    return (
        <>
            <Head title='Dashboard' />
            <div className='grid md:grid-cols-2 gap-6'>
                <Card>
                    <Card.Header className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <Card.Title className='font-medium'>Artikel Dibuat</Card.Title>
                        <BookIcon className='size-6 text-muted-foreground' />
                    </Card.Header>
                    <Card.Content>
                        <div className='text-2xl font-bold'>92 Artikel</div>
                        <p className='text-xs text-muted-foreground'>
                            Update terakhir Juli 22, 2024
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
                        <div className='text-2xl font-bold'>92 Project</div>
                        <p className='text-xs text-muted-foreground'>
                            Update terakhir Juli 22, 2024
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
            </div>
        </>
    )
}

DashboardPage.layout = (page: any) => <UserLayout children={page} />
