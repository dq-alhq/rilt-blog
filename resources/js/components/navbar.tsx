import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/logo'
import NavLink from '@/components/nav-link'
import { SearchCommand } from '@/components/search-command'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button, Drawer, Link, ListBox, Separator } from '@/components/ui'
import UserDropdown from '@/components/user-dropdown'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { MenuIcon } from 'lucide-react'

const links = [
    {
        href: 'home',
        name: 'Home'
    },
    {
        href: 'articles.index',
        name: 'Artikel'
    },
    {
        href: 'projects.index',
        name: 'Project'
    }
]

export function Navbar() {
    const [openSearch, setOpenSearch] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    useEffect(() => {
        router.on('navigate', () => setOpenDrawer(false))
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpenSearch((open) => !open)
            }
        }
        document.addEventListener('keydown', down)

        return () => document.removeEventListener('keydown', down)
    }, [])
    const { user } = usePage<PageProps>().props.auth
    return (
        <>
            <SearchCommand open={openSearch} setOpen={setOpenSearch} />
            <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='container flex items-center justify-between h-16 gap-2'>
                    <div className='hidden mr-4 md:flex'>
                        <Link className='mr-6' href='/'>
                            <Logo className='w-8 h-8 fill-danger' />
                        </Link>
                        <nav className='flex items-center gap-2 text-sm'>
                            {links.map((link) => (
                                <NavLink
                                    key={link.href}
                                    href={route(link.href)}
                                    active={route().current(link.href)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <Button
                        onPress={() => setOpenDrawer(!openDrawer)}
                        className='sm:hidden'
                        variant='outline'
                        size='icon'
                    >
                        <MenuIcon />
                    </Button>
                    <Drawer onOpenChange={setOpenDrawer} isOpen={openDrawer}>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Menu</Drawer.Title>
                                <Drawer.Description>Navigation</Drawer.Description>
                            </Drawer.Header>
                            <ListBox
                                items={links}
                                aria-label='menu-navigation'
                                className='mb-auto mt-4 border-none shadow-none'
                                onAction={() => setOpenDrawer(false)}
                            >
                                {(item) => (
                                    <ListBox.Item
                                        id={item.href}
                                        href={route(item.href)}
                                        className={
                                            route().current(item.href) ? 'bg-muted' : ''
                                        }
                                    >
                                        {item.name}
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Drawer.Content>
                    </Drawer>
                    <div className='flex items-center justify-between flex-1 gap-2 md:justify-end'>
                        <Button
                            onPress={() => setOpenSearch(true)}
                            id='search'
                            variant='outline'
                            className='flex items-center justify-between w-full md:max-w-xs'
                        >
                            <span className='inline-flex'>Search ...</span>
                            <span className='flex items-center px-2 py-0.5 rounded-lg border'>
                                ⌘K
                            </span>
                        </Button>
                        <ThemeToggle />
                        <Separator orientation='vertical' className='h-8 mx-2' />
                        <UserDropdown user={user} />
                    </div>
                </div>
            </header>
        </>
    )
}
