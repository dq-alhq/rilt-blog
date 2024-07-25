import { List, SearchItem } from '@/components/item-list'
import { Article } from '@/types'

interface Props {
    articles: Article[]
    page: number
    total: number
}

export default async function ArticlesTable({ articles, total, page }: Props) {
    return (
        <>
            <div className='mb-6 flex w-full flex-wrap items-center justify-between gap-4'>
                <h2 className='text-2xl font-semibold'>Artikel</h2>
                <SearchItem />
            </div>
            {articles.length > 0 ? (
                <List type='article' page={page} total={total} items={articles} />
            ) : (
                <div>Belum ada Artikel</div>
            )}
        </>
    )
}
