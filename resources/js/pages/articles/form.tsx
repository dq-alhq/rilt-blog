import React, { FormEventHandler, useState } from 'react'

import { Markdown } from '@/components/markdown'
import {
    Badge,
    Button,
    buttonVariants,
    Card,
    Form,
    Link,
    MultiSelect,
    NumberField,
    Separator,
    Switch,
    Textarea,
    TextField
} from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { cn, formatDate } from '@/lib/utils'
import { Article, FormSetting, Tag } from '@/types'
import { router, useForm } from '@inertiajs/react'

export default function ArticleForm({
    article,
    project_id,
    tags,
    form_setting
}: {
    article?: Article
    project_id: number
    tags: Tag[]
    form_setting: FormSetting
}) {
    const { method, action, title } = form_setting
    const [isPreview, setIsPreview] = useState(false)
    const { data, setData, errors, setError, processing } = useForm({
        title: article?.title || '',
        description: article?.description || '',
        body: article?.body || '',
        tags:
            article?.tags?.map((tag: Tag) => ({
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
        router.post(
            action,
            {
                _method: method,
                ...data,
                tags: data.tags.map((tag) => tag.value),
                project_id: project_id || null
            },
            { onError: (errors: any) => setError(errors) }
        )
    }

    const isPreviewClassname: any = isPreview ? 'hidden' : ''

    return (
        <Card>
            <Card.Header className='flex flex-row items-center justify-between'>
                <Card.Title>{title}</Card.Title>
                <Link
                    href={route('articles.table')}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    Kembali
                </Link>
            </Card.Header>
            {isPreview && <Separator />}
            <Form onSubmit={submit} validationErrors={errors} validationBehavior='aria'>
                <Card.Content className='space-y-4'>
                    <div className={isPreview ? '-m-1 lg:m-0' : 'hidden'}>
                        {project_id && (
                            <span className='text-sm'>Chapter {data.chapter}</span>
                        )}
                        <div className='text-muted-foreground text-sm my-4'>
                            {formatDate(Date())}
                        </div>
                        <div className='text-2xl md:text-4xl lg:text-5xl font-bold'>
                            {data.title}
                        </div>
                        <div className='md:my-4 text-sm md:text-base'>
                            {data.description}
                        </div>
                        <div className='flex gap-1 my-4'>
                            {data.tags.map((tag: any, i) => (
                                <Badge key={i}>{tag.label}</Badge>
                            ))}
                        </div>
                        <Markdown content={data.body} className='my-8 md:max-w-5xl' />
                    </div>
                    {project_id && (
                        <NumberField
                            className={cn(isPreviewClassname)}
                            label='Chapter'
                            name='chapter'
                            id='chapter'
                            minValue={1}
                            value={data.chapter}
                            onChange={(e) => setData('chapter', e)}
                            isRequired
                            errorMessage={errors?.chapter}
                        />
                    )}
                    <TextField
                        className={cn(isPreviewClassname)}
                        label='Title'
                        name='title'
                        id='title'
                        value={data.title}
                        onChange={(e) => setData('title', e)}
                        isRequired
                        autoFocus
                        errorMessage={errors.title}
                    />
                    <Textarea
                        className={cn(isPreviewClassname)}
                        label='Description'
                        name='description'
                        id='description'
                        textareaClassName='min-h-[90px]'
                        value={data.description}
                        onChange={(e) => setData('description', e)}
                        isRequired
                        errorMessage={errors.description}
                    />
                    <MultiSelect
                        label='Tags'
                        max={4}
                        className={cn(isPreviewClassname)}
                        items={tags.map((tag: Tag) => ({
                            value: String(tag.id),
                            label: String(tag.name)
                        }))}
                        value={data?.tags}
                        onChange={(items) => setData('tags', items)}
                        errorMessage={errors.tags}
                    />
                    <Textarea
                        onKeyDown={handleKeyDown}
                        className={cn(isPreviewClassname)}
                        textareaClassName='min-h-[150px]'
                        label='Body'
                        name='body'
                        id='body'
                        value={data.body}
                        onChange={(e) => setData('body', e)}
                        isRequired
                        autoSize
                        errorMessage={errors.body}
                    />
                </Card.Content>
                {isPreview && <Separator />}
                <Card.Footer className='justify-between'>
                    <Switch
                        isSelected={isPreview}
                        onChange={() => setIsPreview(!isPreview)}
                    >
                        Preview
                    </Switch>
                    <Button isDisabled={processing} type='submit'>
                        Simpan
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    )
}

ArticleForm.layout = (page: any) => <UserLayout children={page} />
