import React from 'react'

import { DeleteAction } from '@/components/item-list'
import { Pagination } from '@/components/pagination'
import { Search } from '@/components/search'
import { Avatar, Badge, buttonVariants, Card, Menu, Table } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'
import { PageProps, User } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { MoreVerticalIcon, TrashIcon, UserCog2Icon, UserIcon } from 'lucide-react'

export default function UsersTable(props: any) {
    const { data: users, meta, links } = props.users
    return (
        <Card>
            <Card.Header className='flex flex-col lg:flex-row w-full flex-wrap items-center justify-between gap-4'>
                <Card.Title>Daftar User</Card.Title>
                <Search />
            </Card.Header>
            {users.length > 0 ? (
                <>
                    <Card.Content>
                        <Table aria-labelledby='Users'>
                            <Table.Header>
                                <Table.Column>#</Table.Column>
                                <Table.Column>Name</Table.Column>
                                <Table.Column>Username</Table.Column>
                                <Table.Column>Joined</Table.Column>
                                <Table.Column>Creation</Table.Column>
                                <Table.Column />
                            </Table.Header>
                            <Table.Body items={users}>
                                {users.map((item: User, index: number) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <Avatar src={item.avatar} />
                                                {item.name}
                                                {item.admin && (
                                                    <Badge variant='primary'>Admin</Badge>
                                                )}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className='flex flex-col gap-1 text-xs'>
                                                <span>{item.username}</span>
                                                <span>{item.email}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className='flex flex-col gap-1 text-xs'>
                                                <span>{item.joined}</span>
                                                <span>Verified: {item.verified}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className='flex flex-col gap-1 text-xs'>
                                                <span>
                                                    {item.articles_created} Artikel
                                                </span>
                                                <span>
                                                    {item.projects_created} Project
                                                </span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className='text-right'>
                                            <Options item={item} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card.Content>
                    <Card.Footer className='p-4'>
                        <Pagination className='p-0' meta={meta} links={links} />
                    </Card.Footer>
                </>
            ) : (
                <div>Belum ada User</div>
            )}
        </Card>
    )
}

function Options({ item }: { item: User }) {
    const [openDestroy, setOpenDestroy] = React.useState(false)
    const { user } = usePage<PageProps>().props.auth
    return (
        <>
            <Head title='Users' />
            <DeleteAction
                item={item as any}
                type='user'
                open={openDestroy}
                setOpen={setOpenDestroy}
            />
            <Menu>
                <Menu.Trigger
                    aria-label='Options'
                    className={cn(
                        buttonVariants({
                            variant: 'outline'
                        }),
                        'size-7 p-1'
                    )}
                >
                    <MoreVerticalIcon className='size-4' />
                </Menu.Trigger>
                <Menu.Content aria-labelledby='Options' placement='left'>
                    {item.username !== user.username && (
                        <>
                            <Menu.Item
                                onAction={() =>
                                    router.put(route('users.set-admin', item.id))
                                }
                            >
                                <UserCog2Icon /> Jadikan Admin
                            </Menu.Item>
                            <Menu.Item
                                onAction={() =>
                                    router.put(route('users.set-user', item.id))
                                }
                            >
                                <UserIcon /> Jadikan User
                            </Menu.Item>
                        </>
                    )}
                    <Menu.Item isDanger onAction={() => setOpenDestroy(true)}>
                        <TrashIcon />
                        Hapus
                    </Menu.Item>
                </Menu.Content>
            </Menu>
        </>
    )
}

UsersTable.layout = (page: any) => <UserLayout children={page} />
