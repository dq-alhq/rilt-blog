import React, { FormEventHandler } from 'react'

import {
    Button,
    buttonVariants,
    Card,
    Form,
    Link,
    MultiSelect,
    Textarea,
    TextField
} from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { FormSetting, Project, Tag } from '@/types'
import { Head, router, useForm } from '@inertiajs/react'

export default function ProjectForm({
    project,
    tags,
    form_setting
}: {
    project: Project
    tags: Tag[]
    form_setting: FormSetting
}) {
    const { method, action, title } = form_setting
    const { data, setData, errors, setError, processing } = useForm({
        title: project?.title || '',
        description: project?.description || '',
        tags:
            project?.tags?.map((tag: any) => ({
                value: tag?.id.toString(),
                label: tag?.name.toString()
            })) || []
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        router.post(
            action,
            {
                _method: method,
                ...data,
                tags: data.tags.map((tag) => tag.value)
            },
            { onError: (errors: any) => setError(errors) }
        )
    }

    return (
        <Card>
            <Head title={title} />
            <Card.Header className='flex flex-row items-center justify-between'>
                <Card.Title>{title}</Card.Title>
                <Link
                    href={route('projects.table')}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    Kembali
                </Link>
            </Card.Header>
            <Form onSubmit={submit} validationErrors={errors} validationBehavior='aria'>
                <Card.Content className='space-y-4'>
                    <TextField
                        label='Title'
                        name='title'
                        id='title'
                        value={data.title}
                        onChange={(e) => setData('title', e)}
                        isRequired
                        errorMessage={errors.title}
                    />
                    <Textarea
                        label='Description'
                        textareaClassName='min-h-[90px]'
                        value={data.description}
                        onChange={(e) => setData('description', e)}
                        isRequired
                        errorMessage={errors.description}
                    />
                    <MultiSelect
                        label='Tags'
                        max={4}
                        items={tags.map((tag: Tag) => ({
                            value: String(tag.id),
                            label: String(tag.name)
                        }))}
                        value={data?.tags}
                        onChange={(items) => setData('tags', items)}
                        errorMessage={errors.tags}
                    />
                </Card.Content>
                <Card.Footer className='justify-end'>
                    <Button isDisabled={processing} type='submit'>
                        Simpan
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    )
}

ProjectForm.layout = (page: any) => <UserLayout children={page} />
