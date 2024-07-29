import NavLink from '@/components/side-nav-link'
import { Icon, Separator } from '@/components/ui'
import { useMediaQuery } from '@/lib/utils'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'

export function DashboardSidebar() {
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    const { user } = usePage<PageProps>().props.auth
    return (
        <nav className='flex border-b lg:border-0 flex-row lg:flex-col items-center w-full gap-1 lg:w-2/12 overflow-x-scroll scrollbar-none'>
            <NavLink active={route().current('dashboard')} href={route('dashboard')}>
                <Icon icon='Gauge' /> Dashboard
            </NavLink>
            <Separator
                orientation={isDesktop ? 'horizontal' : 'vertical'}
                className='h-9 lg:h-full'
            />
            <NavLink
                active={route().current('profile.edit')}
                href={route('profile.edit')}
            >
                <Icon icon='User' /> Profile
            </NavLink>
            <NavLink
                active={route().current('password.edit')}
                href={route('password.edit')}
            >
                <Icon icon='KeyRound' /> Password
            </NavLink>
            <NavLink
                active={route().current('profile.delete')}
                href={route('profile.delete')}
            >
                <Icon icon='TriangleAlert' /> Danger Area
            </NavLink>
            <Separator
                orientation={isDesktop ? 'horizontal' : 'vertical'}
                className='h-9 lg:h-full'
            />
            <NavLink
                active={route().current('articles.*')}
                href={route('articles.table')}
            >
                <Icon icon='Book' /> Artikel Saya
            </NavLink>
            <NavLink
                active={route().current('projects.*')}
                href={route('projects.table')}
            >
                <Icon icon='BookCopy' /> Project Saya
            </NavLink>
            <NavLink active={route().current('tags.*')} href={route('tags.index')}>
                <Icon icon='Tag' /> Daftar Tag
            </NavLink>
            {user.admin && (
                <>
                    <Separator
                        orientation={isDesktop ? 'horizontal' : 'vertical'}
                        className='h-9 lg:h-full'
                    />
                    <NavLink
                        active={route().current('users.*')}
                        href={route('users.index')}
                    >
                        <Icon icon='Users' /> Users
                    </NavLink>
                    <NavLink
                        active={route().current('admin.publish_request')}
                        href={route('admin.publish_request')}
                    >
                        <Icon icon='BookOpenCheck' /> Publish Requests
                    </NavLink>
                    <NavLink
                        active={route().current('admin.articles')}
                        href={route('admin.articles')}
                    >
                        <Icon icon='BookCheck' /> Published Articles
                    </NavLink>
                    <NavLink
                        active={route().current('admin.projects')}
                        href={route('admin.projects')}
                    >
                        <Icon icon='BookmarkCheck' /> Published Projects
                    </NavLink>
                </>
            )}
        </nav>
    )
}
