import { useTheme } from '@/components/providers'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, buttonVariants, Link, Menu } from '@/components/ui'
import { User } from '@/types'
import {
    BookCopyIcon,
    BookIcon,
    ComputerIcon,
    GaugeIcon,
    LogOutIcon,
    MoonIcon,
    SunIcon
} from 'lucide-react'

export default function UserDropdown({ user }: { user: User }) {
    const { theme, setTheme } = useTheme()

    if (user)
        return (
            <Menu>
                <Menu.Trigger>
                    <Avatar id='profile-image' src={user?.avatar} alt={user?.name} />
                </Menu.Trigger>
                <Menu.Content className='w-56' placement='bottom right'>
                    <Menu.Section>
                        <Menu.Header separator>
                            <span className='block'>{user?.name}</span>
                            <span className='font-normal text-muted-foreground'>
                                {user?.email}
                            </span>
                        </Menu.Header>
                    </Menu.Section>
                    <Menu.SubTrigger>
                        <Menu.Item aria-label='Switch Theme'>
                            {theme === 'system' ? (
                                <ComputerIcon />
                            ) : theme === 'dark' ? (
                                <MoonIcon />
                            ) : (
                                <SunIcon />
                            )}
                            <span>Switch Theme</span>
                        </Menu.Item>
                        <Menu.Content aria-labelledby='switch-theme'>
                            <Menu.Item onAction={() => setTheme('system')}>
                                <ComputerIcon />
                                <span>System</span>
                            </Menu.Item>
                            <Menu.Item onAction={() => setTheme('dark')}>
                                <MoonIcon />
                                <span>Dark</span>
                            </Menu.Item>
                            <Menu.Item onAction={() => setTheme('light')}>
                                <SunIcon />
                                <span>Light</span>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.SubTrigger>
                    <Menu.Separator />
                    <Menu.Item href='/dashboard'>
                        <GaugeIcon />
                        Dashboard
                    </Menu.Item>
                    <Menu.Item href='/articles/list'>
                        <BookIcon />
                        Daftar Artikel
                    </Menu.Item>
                    <Menu.Item href='/projects/list'>
                        <BookCopyIcon />
                        Daftar Project
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item
                        isDanger
                        href={route('logout')}
                        routerOptions={{ method: 'post' }}
                    >
                        <LogOutIcon />
                        Log Out
                    </Menu.Item>
                </Menu.Content>
            </Menu>
        )
    return (
        <div className='flex gap-2'>
            <ThemeToggle />
            <Link className={buttonVariants()} href={route('login')}>
                Login
            </Link>
        </div>
    )
}
