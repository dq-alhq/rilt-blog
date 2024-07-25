import React from 'react'

import NavLink from '@/components/nav-link'
import { Navbar } from '@/components/navbar'

const menuItems = [
    { id: 1, label: 'Dashboard', url: 'dashboard', icon: 'Gauge' },
    { id: 2, label: 'Daftar Artikel', url: 'articles.table', icon: 'Book' },
    { id: 3, label: 'Daftar Project', url: 'project.table', icon: 'Book' }
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col w-full min-h-screen'>
            <Navbar />
            <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background py-4 md:py-10 md:gap-8'>
                <div className='container flex flex-col items-start w-full gap-6 lg:flex-row'>
                    <nav className='flex flex-col w-full gap-1 lg:w-2/12'>
                        <NavLink
                            active={route().current('dashboard')}
                            href={route('dashboard')}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            active={route().current('profile.edit')}
                            href={route('profile.edit')}
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            active={route().current('password.edit')}
                            href={route('password.edit')}
                        >
                            Password
                        </NavLink>
                        <NavLink
                            active={route().current('profile.delete')}
                            href={route('profile.delete')}
                        >
                            Danger Area
                        </NavLink>
                    </nav>
                    <div className='w-full lg:w-10/12'>{children}</div>
                </div>
            </main>
        </div>
    )
}
