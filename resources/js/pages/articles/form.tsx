import React, { FormEventHandler, useState } from 'react'

import {
    Button,
    Card,
    Form,
    MultiSelect,
    NumberField,
    Switch,
    Textarea,
    TextField
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Article, Project, Tag } from '@/types'
import { useForm } from '@inertiajs/react'

export default function ArticleForm({
    article,
    project,
    tags
}: {
    article?: Article
    project?: Project
    tags: Tag[]
}) {
    const [isPreview, setIsPreview] = useState(false)
    const { data, setData, errors, post, processing, reset } = useForm({
        title: article?.title || '',
        description: article?.description || '',
        content: article?.content || '',
        tags:
            article?.tags?.map((tag: any) => ({
                value: tag?.id.toString(),
                label: tag?.name.toString()
            })) || [],
        chapter: article?.chapter || 1
    })

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            const { selectionStart, selectionEnd } = e.currentTarget
            const value = e.currentTarget.value
            e.currentTarget.value =
                value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd)
            e.currentTarget.setSelectionRange(selectionStart + 1, selectionStart + 1)
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('article.store'), {
            method: 'post',
            onSuccess: () => reset()
        })
    }

    const isPreviewClassname: any = isPreview ? 'hidden' : ''

    return (
        <Card className='p-1 md:p-0 border-0 shadow-none'>
            <Form onSubmit={submit} className='space-y-4'>
                {project && (
                    <NumberField
                        className={cn(isPreviewClassname)}
                        label='Chapter'
                        value={data.chapter}
                        onChange={(e) => setData('chapter', e)}
                        isRequired
                        validationBehavior='aria'
                        errorMessage={errors.chapter}
                    />
                )}
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
                <Textarea
                    onKeyDown={handleKeyDown}
                    className={cn(isPreviewClassname)}
                    textareaClassName='min-h-[150px]'
                    label='Content'
                    value={data.content}
                    onChange={(e) => setData('content', e)}
                    isRequired
                    autoSize
                    validationBehavior='aria'
                    errorMessage={errors.content}
                />
                <div className='flex justify-between'>
                    <Switch
                        isSelected={isPreview}
                        onChange={() => setIsPreview(!isPreview)}
                    >
                        Preview
                    </Switch>
                    <Button isDisabled={processing} type='submit'>
                        {article ? 'Update' : 'Create'}
                    </Button>
                </div>
            </Form>
        </Card>
    )
}
