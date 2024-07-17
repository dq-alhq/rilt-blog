import { Card } from '@/components/ui'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export default function Home() {
    return (
        <>
            <Head title='Home' />
            <div className='container py-12'>
                <Card className='p-6'>This is your homepage</Card>
            </div>
        </>
    )
}

Home.layout = (page: any) => <AppLayout header='Home' children={page} />
