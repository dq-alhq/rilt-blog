import React from 'react'

import { Pagination } from '@/components/pagination'
import {
    Badge,
    Button,
    buttonVariants,
    Card,
    Link,
    Menu,
    Modal,
    SearchField,
    Switch,
    Table
} from '@/components/ui'
import { Article, Project, Tag } from '@/types'
import {
    BookCopyIcon,
    BookPlusIcon,
    EditIcon,
    EyeIcon,
    MoreVerticalIcon,
    TrashIcon
} from 'lucide-react'

interface Props {
    type: 'article' | 'project'
    items: Article[] | Project[]
    page: number
    total: number
}

export function List({ type, items, page, total }: Props) {
    return (
        <Card className='border-0 shadow-none'>
            <Card.Content>
                <Table aria-labelledby='Items'>
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column>Title</Table.Column>
                        <Table.Column>Tags</Table.Column>
                        {type === 'project' && <Table.Column>Articles</Table.Column>}
                        <Table.Column>Published</Table.Column>
                        <Table.Column />
                    </Table.Header>
                    {/* @ts-expect-error */}
                    <Table.Body items={items}>
                        {items.map((item: Article | Project, index: number) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{page * 10 - 9 + index}</Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell className='space-x-1'>
                                    {item.tags.map((tag: Tag) => (
                                        <Badge key={tag.id}>{tag.name}</Badge>
                                    ))}
                                </Table.Cell>
                                {type === 'project' && (
                                    // @ts-expect-error
                                    <Table.Cell>{item._count.articles}</Table.Cell>
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
            <Card.Footer className='p-0'>
                <Pagination current={page} per_page={10} total={total} />
            </Card.Footer>
        </Card>
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
            <Menu>
                <Menu.Trigger
                    aria-label='Options'
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'icon'
                    })}
                >
                    <MoreVerticalIcon />
                </Menu.Trigger>
                <Menu.Content aria-labelledby='Options' placement='left'>
                    {type === 'project' && (
                        <>
                            <Menu.Item href={`/projects/${item.slug}/articles/list`}>
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
                    <Menu.Item href={`/${type}s/${item.slug}/edit`}>
                        <EditIcon />
                        Edit
                    </Menu.Item>
                    <Menu.Item isDanger onAction={() => setOpenDestroy(true)}>
                        <TrashIcon />
                        Hapus
                    </Menu.Item>
                </Menu.Content>
            </Menu>
            <DeleteAction
                item={item}
                type={type}
                open={openDestroy}
                setOpen={setOpenDestroy}
            />
        </>
    )
}

interface PaginateProps {
    current: number
    per_page: number
    total: number
}

function Publish({
    item,
    type
}: {
    item: Article | Project
    type: 'article' | 'project'
}) {
    return <Switch isSelected={item.published} onChange={() => {}} />
}

function DeleteAction({
    item,
    type,
    open,
    setOpen
}: {
    item: Article | Project
    type: 'article' | 'project'
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Modal.Overlay isOpen={open} onOpenChange={setOpen}>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        Hapus <span className='capitalize'>{type}: </span>
                        {item.title}
                    </Modal.Title>
                    <Modal.Description>
                        Tindakan ini akan menghapus data secara permanen
                    </Modal.Description>
                </Modal.Header>
                <Modal.Footer>
                    <Modal.Close>Cancel</Modal.Close>
                    <Button className='min-w-24' onPress={() => {}} variant='danger'>
                        <TrashIcon /> Hapus
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal.Overlay>
    )
}

export function SearchItem() {
    return (
        <div className='flex items-center gap-4'>
            <SearchField
                aria-labelledby='search'
                onChange={() => {}}
                placeholder='Cari ...'
            />
            <Link className={buttonVariants()} href={route('articles.create')}>
                <BookPlusIcon /> Buat Baru
            </Link>
        </div>
    )
}
