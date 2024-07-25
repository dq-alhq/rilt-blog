import { Command, Icon } from '@/components/ui'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

export const SearchCommand = ({ open, setOpen }: Props) => {
    const { user } = usePage<PageProps>().props.auth

    function goto(route: string) {
        router.get(
            route,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setOpen(false)
            }
        )
    }

    return (
        <Command.Modal isOpen={open} onOpenChange={setOpen}>
            <Command.Input placeholder='Type a command or search...' />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group heading='Suggestions'>
                    <Command.Item value='home' onSelect={() => goto(route('home'))}>
                        <Icon icon='Home' className='w-4 h-4 mr-2' />
                        <span>Home</span>
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                {user ? (
                    <Command.Group heading='Settings'>
                        <Command.Item
                            value='profile'
                            onSelect={() => goto(route('profile.edit'))}
                        >
                            <Icon icon='CircleUserRound' className='mr-2 size-4' />
                            <span>Profile</span>
                        </Command.Item>
                        <Command.Item
                            value='logout'
                            onSelect={() => router.post(route('logout'))}
                        >
                            <Icon icon='LogOut' className='mr-2 size-4' />
                            <span>Logout</span>
                        </Command.Item>
                    </Command.Group>
                ) : (
                    <Command.Group heading='Auth'>
                        <Command.Item value='login' onSelect={() => goto(route('login'))}>
                            <Icon icon='LogIn' className='mr-2 size-4' />
                            <span>Login</span>
                        </Command.Item>
                        <Command.Item
                            value='register'
                            onSelect={() => goto(route('register'))}
                        >
                            <Icon icon='UserPlus' className='mr-2 size-4' />
                            <span>Register</span>
                        </Command.Item>
                    </Command.Group>
                )}
            </Command.List>
        </Command.Modal>
    )
}