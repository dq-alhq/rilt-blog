import { ItemCard } from '@/components/item-card'
import { Pagination } from '@/components/pagination'
import { TagLinks } from '@/components/tag-links'
import { Article } from '@/types'

interface Props {
    articles: Article[]
    page: number
    total: number
}

export default function ArticleIndex({ articles, page, total }: Props) {
    return (
        <main>
            <div className='container mt-12'>
                <h1 className='text-2xl font-bold text-foreground sm:text-3xl lg:text-5xl'>
                    Artikel
                </h1>
                <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                    Selamat datang di halaman artikel kami! Dari pemula hingga pengembang
                    yang berpengalaman, kumpulan artikel kami siap membantu.
                </p>
                <TagLinks />
                <div className='py-8 sm:py-16'>
                    <div className='grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12'>
                        {articles.map((article: Article) => (
                            <ItemCard key={article.id} item={article} type='article' />
                        ))}
                    </div>
                    {articles.length > 9 && (
                        <div className='py-3'>
                            <Pagination
                                current={Number(page)}
                                per_page={9}
                                total={total}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
