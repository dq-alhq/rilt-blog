import React, { useEffect } from 'react'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Navbar } from '@/components/navbar'
import { useMediaQuery } from '@/lib/utils'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import { toast } from 'sonner'

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { message } = usePage<PageProps>().props
    useEffect(() => {
        if (message) {
            toast(message)
        }
    }, [message])
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return (
        <div className='flex flex-col w-full min-h-screen'>
            <Navbar />
            <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-background py-4 md:py-10'>
                <div className='container flex flex-col items-start w-full gap-6 lg:gap-10 lg:flex-row'>
                    <DashboardSidebar />
                    <div className='w-full lg:w-10/12'>{children}</div>
                </div>
            </main>
        </div>
    )
}
