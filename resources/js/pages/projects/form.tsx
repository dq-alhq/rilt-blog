import React, { FormEventHandler, useState } from 'react'

import {
    Button,
    Card,
    Form,
    MultiSelect,
    Switch,
    Textarea,
    TextField
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Project, Tag } from '@/types'
import { useForm } from '@inertiajs/react'

export default function ArticleForm({
    project,
    tags
}: {
    project?: Project
    tags: Tag[]
}) {
    const [isPreview, setIsPreview] = useState(false)
    const { data, setData, errors, post, processing, reset } = useForm({
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

        post(route('project.store'), {
            method: 'post',
            onSuccess: () => reset()
        })
    }

    const isPreviewClassname: any = isPreview ? 'hidden' : ''

    return (
        <Card className='p-1 md:p-0 border-0 shadow-none'>
            <Form onSubmit={submit} className='space-y-4'>
                <TextField
                    className={cn(isPreviewClassname)}
                    label='Title'
                    value={data.title}
                    onChange={(e) => setData('title', e)}
                    isRequired
                    validationBehavior='aria'
                    errorMessage={errors.title}
                />
                <Textarea
                    className={cn(isPreviewClassname)}
                    label='Description'
                    textareaClassName='min-h-[90px]'
                    value={data.description}
                    onChange={(e) => setData('description', e)}
                    isRequired
                    validationBehavior='aria'
                    errorMessage={errors.description}
                />
                <MultiSelect
                    label='Tags'
                    max={4}
                    className={cn(isPreviewClassname)}
                    items={tags.map((tag) => ({
                        value: tag.id.toString(),
                        label: tag.name
                    }))}
                    value={data.tags}
                    onChange={(e) => setData('tags', e)}
                    errorMessage={errors.tags}
                />
                <div className='flex justify-between'>
                    <Switch
                        isSelected={isPreview}
                        onChange={() => setIsPreview(!isPreview)}
                    >
                        Preview
                    </Switch>
                    <Button isDisabled={processing} type='submit'>
                        {project ? 'Update' : 'Create'}
                    </Button>
                </div>
            </Form>
        </Card>
    )
}
