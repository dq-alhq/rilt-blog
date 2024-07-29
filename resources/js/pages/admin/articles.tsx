import React from 'react'

import { Pagination } from '@/components/pagination'
import { Badge, badgeVariants, Card, Menu, Table } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'
import { Article, Tag } from '@/types'
import { Head, router } from '@inertiajs/react'

export default function Articles(props: any) {
    const { data: articles, meta, links } = props.articles
    return (
        <Card>
            <Head title='Artikel' />
            <Card.Header>
                <Card.Title>Artikel</Card.Title>
            </Card.Header>
            {articles.length > 0 ? (
                <>
                    <Card.Content>
                        <Table aria-labelledby='Articles'>
                            <Table.Header>
                                <Table.Column>#</Table.Column>
                                <Table.Column>Title</Table.Column>
                                <Table.Column>Tags</Table.Column>
                                <Table.Column>Author</Table.Column>
                                <Table.Column />
                            </Table.Header>
                            <Table.Body items={articles}>
                                {articles.map((item: Article, index: number) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell className='space-x-1'>
                                            {item.tags.map((tag: Tag) => (
                                                <Badge key={tag.id}>{tag.name}</Badge>
                                            ))}
                                        </Table.Cell>
                                        <Table.Cell>{item.author.name}</Table.Cell>
                                        <Table.Cell>
                                            <PublishOption
                                                slug={item.slug}
                                                status={item.status}
                                                type={'article'}
                                            />
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
                <div className='p-6 text-center'>Belum ada Artikel</div>
            )}
        </Card>
    )
}

export function PublishOption({
    status,
    slug,
    type
}: {
    status: 0 | 1 | 2
    slug: string
    type: 'article' | 'project'
}) {
    return (
        <Menu>
            <Menu.Trigger
                aria-label='Options'
                className={cn(
                    badgeVariants({ variant: status === 2 ? 'success' : 'outline' }),
                    'cursor-pointer select-none focus:outline-none disabled:cursor-default'
                )}
            >
                {status === 0 && 'Unpublished'}
                {status === 1 && 'Pending'}
                {status === 2 && 'Published'}
            </Menu.Trigger>
            <Menu.Content aria-labelledby='Options' placement='left'>
                {status !== 2 && <Menu.Item isDisabled>User belum publish</Menu.Item>}
                {status !== 0 && (
                    <Menu.Item
                        onAction={() => router.put(route(`${type}s.admin.reject`, slug))}
                    >
                        Unpublish
                    </Menu.Item>
                )}
            </Menu.Content>
        </Menu>
    )
}

Articles.layout = (page: any) => <UserLayout children={page} />
