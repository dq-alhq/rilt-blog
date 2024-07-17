import React from 'react'

import { AppLogo } from '@/components/app-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Card, Link } from '@/components/ui'
import { Head } from '@inertiajs/react'

interface Props {
    title: string
    description?: string
    children: React.ReactNode
}

export default function GuestLayout({ title, description, children }: Props) {
    return (
        <>
            <Head title={title} />
            <div className='flex min-h-screen flex-col gap-6 sm:justify-center py-8 items-center'>
                <div className='absolute top-4 right-4'>
                    <ThemeToggle />
                </div>
                <div>
                    <Link href='/'>
                        <AppLogo className='w-20 h-20 fill-current' />
                    </Link>
                </div>
                <Card className='w-full max-w-lg'>
                    <Card.Header>
                        <Card.Title>{title}</Card.Title>
                        <Card.Description>{description}</Card.Description>
                    </Card.Header>
                    <Card.Content>{children}</Card.Content>
                </Card>
            </div>
        </>
    )
}
