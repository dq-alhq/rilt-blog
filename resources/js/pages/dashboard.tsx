import { Card } from '@/components/ui'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export default function Dashboard() {
    return (
        <>
            <Head title='Dashboard' />
            <div className='container py-12'>
                <Card className='p-6'>You're logged in!</Card>
            </div>
        </>
    )
}

Dashboard.layout = (page: any) => <AppLayout header='Dashboard' children={page} />
