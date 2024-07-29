import React, { PropsWithChildren } from 'react'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui'

export default function AppLayout({
    children,
    header
}: PropsWithChildren<{ header?: string }>) {
    return (
        <>
            <Toaster />
            <div className='min-h-screen'>
                <Navbar />

                <main className='min-h-[calc(100vh-12rem)]'>{children}</main>

                <Footer />
            </div>
        </>
    )
}
