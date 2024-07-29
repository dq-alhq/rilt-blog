import { List } from '@/components/item-list'
import { Search } from '@/components/search'
import { buttonVariants, Card, Link } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { BookPlusIcon } from 'lucide-react'

export default function ArticlesTable(props: any) {
    const { data: articles, meta, links } = props.articles
    return (
        <Card>
            <Card.Header className='flex flex-col lg:flex-row w-full flex-wrap items-center justify-between gap-4'>
                <Card.Title className='text-2xl font-semibold'>Artikel</Card.Title>
                <div className='flex items-center gap-2'>
                    <Search />
                    <Link
                        href={
                            props.project
                                ? route('projects.articles.create', props.project)
                                : route('articles.create')
                        }
                        className={buttonVariants()}
                    >
                        <BookPlusIcon /> Buat {props.project ? 'Chapter' : 'Artikel'}
                    </Link>
                </div>
            </Card.Header>
            {articles.length > 0 ? (
                <List type='article' items={articles} meta={meta} links={links} />
            ) : (
                <div>Belum ada Artikel</div>
            )}
        </Card>
    )
}

ArticlesTable.layout = (page: any) => <UserLayout children={page} />
