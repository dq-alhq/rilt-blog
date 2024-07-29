import React from 'react'

import { Pagination } from '@/components/pagination'
import { buttonVariants, Card, Link, Table } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { TagForm } from '@/pages/tags/form'
import { Tag } from '@/types'
import { EditIcon, TagsIcon } from 'lucide-react'

export default function TagIndex(props: any) {
    const { data: tags, meta, links } = props.tags
    const { user } = props.auth
    const [openForm, setOpenForm] = React.useState(
        route().current('tags.create') || route().current('tags.edit')
    )
    return (
        <>
            <TagForm open={openForm} setOpen={setOpenForm} />
            <Card>
                <Card.Header className='flex flex-col lg:flex-row w-full flex-wrap items-center justify-between gap-4'>
                    <Card.Title className='text-2xl font-semibold'>Tags</Card.Title>
                    <Link href={route('tags.create')} className={buttonVariants()}>
                        <TagsIcon /> Buat Tag
                    </Link>
                </Card.Header>
                {tags.length > 0 ? (
                    <>
                        <Card.Content>
                            <Table aria-labelledby='Tags'>
                                <Table.Header>
                                    <Table.Column>#</Table.Column>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Article</Table.Column>
                                    <Table.Column>Project</Table.Column>
                                    <Table.Column />
                                </Table.Header>
                                <Table.Body items={tags}>
                                    {tags.map((item: Tag, index: number) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <img
                                                        src={`/svgs/${item.slug}.svg`}
                                                        className='w-6 h-6 dark:invert'
                                                        alt={item.name}
                                                    />
                                                    {item.name}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>{item.articles_count}</Table.Cell>
                                            <Table.Cell>{item.projects_count}</Table.Cell>
                                            <Table.Cell className='text-right'>
                                                {user.admin && (
                                                    <Link
                                                        href={route(
                                                            'tags.edit',
                                                            item.slug
                                                        )}
                                                        className={buttonVariants({
                                                            variant: 'outline',
                                                            size: 'icon'
                                                        })}
                                                    >
                                                        <EditIcon />
                                                    </Link>
                                                )}
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
                    <div className='p-6 text-center'>Belum ada Tag</div>
                )}
            </Card>
        </>
    )
}

TagIndex.layout = (page: any) => <UserLayout children={page} />
