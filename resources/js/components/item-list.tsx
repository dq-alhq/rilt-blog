import React from 'react'

import { Pagination } from '@/components/pagination'
import {
    Badge,
    Button,
    buttonVariants,
    Card,
    Menu,
    Modal,
    Switch,
    Table
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Article, Project, Tag } from '@/types'
import { router } from '@inertiajs/react'
import {
    BookCopyIcon,
    BookPlusIcon,
    EditIcon,
    EyeIcon,
    MoreVerticalIcon,
    TrashIcon
} from 'lucide-react'

export function List({ type, items, meta, links }: any) {
    return (
        <>
            <Card.Content>
                <Table aria-labelledby='Items'>
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column>Title</Table.Column>
                        <Table.Column>Tags</Table.Column>
                        {type === 'project' && <Table.Column>Articles</Table.Column>}
                        {items.length > 0 && items[0].chapter && (
                            <Table.Column>Chapter</Table.Column>
                        )}
                        <Table.Column>Published</Table.Column>
                        <Table.Column />
                    </Table.Header>
                    <Table.Body items={items}>
                        {items.map((item: Article | Project, index: number) => (
                            <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell className='space-x-1'>
                                    {item.tags.map((tag: Tag) => (
                                        <Badge key={tag.id}>{tag.name}</Badge>
                                    ))}
                                </Table.Cell>
                                {type === 'project' && (
                                    // @ts-expect-error
                                    <Table.Cell>{item?.articles_count}</Table.Cell>
                                )}
                                {/* @ts-expect-error*/}
                                {item.chapter && (
                                    // @ts-expect-error
                                    <Table.Cell>{item?.chapter}</Table.Cell>
                                )}
                                <Table.Cell>
                                    <Publish item={item} type={type} />
                                </Table.Cell>
                                <Table.Cell className='text-right'>
                                    <Options type={type} item={item} />
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
    )
}

function Options({
    item,
    type
}: {
    item: Article | Project
    type: 'article' | 'project'
}) {
    const [openDestroy, setOpenDestroy] = React.useState(false)
    return (
        <>
            <DeleteAction
                item={item}
                type={type}
                open={openDestroy}
                setOpen={setOpenDestroy}
            />
            <Menu>
                <Menu.Trigger
                    aria-label='Options'
                    className={cn(buttonVariants({ variant: 'outline' }), 'size-7 p-1')}
                >
                    <MoreVerticalIcon className='size-4' />
                </Menu.Trigger>
                <Menu.Content aria-labelledby='Options' placement='left'>
                    {type === 'project' && (
                        <>
                            <Menu.Item href={`/projects/${item.slug}/articles/table`}>
                                <BookCopyIcon />
                                Daftar Artikel
                            </Menu.Item>
                            <Menu.Item href={`/projects/${item.slug}/articles/create`}>
                                <BookPlusIcon />
                                Tambah Artikel
                            </Menu.Item>
                        </>
                    )}
                    <Menu.Item href={`/${type}s/${item.slug}`}>
                        <EyeIcon />
                        Tampilkan
                    </Menu.Item>
                    {/* @ts-expect-error */}
                    {item.project ? (
                        <Menu.Item
                            // @ts-expect-error
                            href={`/projects/${item.project}/articles/${item.slug}/edit`}
                        >
                            <EditIcon />
                            Edit
                        </Menu.Item>
                    ) : (
                        <Menu.Item href={`/articles/${item.slug}/edit`}>
                            <EditIcon />
                            Edit
                        </Menu.Item>
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

function Publish({
    item,
    type
}: {
    item: Article | Project
    type: 'article' | 'project'
}) {
    return (
        <Switch
            aria-label='Publish'
            id={`publish-${item.id}`}
            isSelected={item.status !== 0}
            onChange={() =>
                router.put(
                    type === 'article'
                        ? route('articles.publish', item.slug)
                        : route('projects.publish', item.slug)
                )
            }
        />
    )
}

export function DeleteAction({
    item,
    type,
    open,
    setOpen
}: {
    item: Article | Project
    type: 'article' | 'project' | 'user'
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Button className='sr-only'>Delete Item</Button>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        Hapus <span className='capitalize'>{type}: </span>
                        <p className='text-sm '>{item.title}</p>
                    </Modal.Title>
                    <Modal.Description>
                        Tindakan ini akan menghapus data secara permanen!
                    </Modal.Description>
                </Modal.Header>
                <Modal.Footer>
                    <Modal.Close>Cancel</Modal.Close>
                    <Button
                        className='min-w-24'
                        onPress={() => {
                            setOpen(false)
                            router.delete(route(`${type}s.destroy`, `${item.slug}`))
                        }}
                        variant='danger'
                    >
                        <TrashIcon /> Hapus
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
