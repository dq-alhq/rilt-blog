import React from 'react'

import { Pagination } from '@/components/pagination'
import { Badge, Button, Card, Table } from '@/components/ui'
import { Article, Tag } from '@/types'
import { router } from '@inertiajs/react'
import { CheckCheckIcon, XIcon } from 'lucide-react'

export default function ProjectRequest({ projects, meta, links }: any) {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Project</Card.Title>
            </Card.Header>
            {projects.length > 0 ? (
                <>
                    <Card.Content>
                        <Table aria-labelledby='Projects'>
                            <Table.Header>
                                <Table.Column>#</Table.Column>
                                <Table.Column>Title</Table.Column>
                                <Table.Column>Tags</Table.Column>
                                <Table.Column>Author</Table.Column>
                                <Table.Column />
                            </Table.Header>
                            <Table.Body items={projects}>
                                {projects.map((item: Article, index: number) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell className='space-x-1'>
                                            {item.tags.map((tag: Tag) => (
                                                <Badge key={tag.id}>{tag.name}</Badge>
                                            ))}
                                        </Table.Cell>
                                        <Table.Cell>{item.author.name}</Table.Cell>
                                        <Table.Cell className='space-x-1'>
                                            <Button
                                                onPress={() =>
                                                    router.put(
                                                        route(
                                                            'projects.admin.publish',
                                                            item.slug
                                                        )
                                                    )
                                                }
                                                size='icon'
                                                variant='success'
                                            >
                                                <CheckCheckIcon />
                                            </Button>
                                            <Button
                                                onPress={() =>
                                                    router.put(
                                                        route(
                                                            'projects.admin.reject',
                                                            item.slug
                                                        )
                                                    )
                                                }
                                                size='icon'
                                                variant='danger'
                                            >
                                                <XIcon />
                                            </Button>
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
                <div className='p-6 text-center'>Belum ada Project</div>
            )}
        </Card>
    )
}
