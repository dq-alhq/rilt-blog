import { ItemCard } from '@/components/item-card'
import { Pagination } from '@/components/pagination'
import { Search } from '@/components/search'
import { TagLinks } from '@/components/tag-links'
import AppLayout from '@/layouts/app-layout'
import { Article } from '@/types'
import { Head } from '@inertiajs/react'

export default function ArticleIndex(props: any) {
    const { data: articles, meta, links } = props.articles
    return (
        <main>
            <Head title='Artikel' />
            <div className='container mt-12'>
                <h1 className='text-2xl font-bold text-foreground sm:text-3xl lg:text-5xl'>
                    Artikel
                </h1>
                <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                    Selamat datang di halaman artikel kami! Dari pemula hingga pengembang
                    yang berpengalaman, kumpulan artikel kami siap membantu.
                </p>
                <div className='flex flex-col lg:flex-row gap-8 justify-between mt-10'>
                    <TagLinks />
                    <Search />
                </div>
                <div className='py-8 sm:py-16'>
                    <div className='grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12'>
                        {articles?.map((article: Article, index: number) => (
                            <ItemCard key={index} item={article} type='article' />
                        ))}
                    </div>
                    {articles.length >= 1 && (
                        <div className='py-3'>
                            <Pagination meta={meta} links={links} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

ArticleIndex.layout = (page: any) => <AppLayout children={page} />
