import { Article, Tag } from '@/types'

import ArticleForm from './form'

export default async function ArticleEditPage({
    tags,
    article
}: {
    tags: Tag[]
    article?: Article
}) {
    return (
        <>
            <div className='mb-6 flex w-full flex-wrap items-center justify-between gap-4'>
                <h2 className='text-2xl font-semibold'>Edit Artikel</h2>
            </div>
            <ArticleForm tags={tags} article={article} />
        </>
    )
}
