import React from 'react'

import { Pagination } from '@/components/pagination'
import { Badge, Card, Table } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { PublishOption } from '@/pages/admin/articles'
import { Project, Tag } from '@/types'

export default function Projects(props: any) {
    const { data: projects, meta, links } = props.projects
    return (
        <Card>
            <Card.Header>
                <Card.Title>Project</Card.Title>
            </Card.Header>
            {projects.length > 0 ? (
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
                            <Table.Body items={projects}>
                                {projects.map((item: Project, index: number) => (
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
                                                type={'project'}
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
                <div className='p-6 text-center'>Belum ada Project</div>
            )}
        </Card>
    )
}

Projects.layout = (page: any) => <UserLayout children={page} />
