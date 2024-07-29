import { Highlight } from '@/components/hero-highlight'
import { Spotlight } from '@/components/spotlight'
import { buttonVariants, Link } from '@/components/ui'
import { siteConfig } from '@/config/site'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Book, BookCopy } from 'lucide-react'

export default function Home() {
    return (
        <>
            <Head title='Home' />
            <Spotlight className='-top-40 left-0 md:left-60 md:-top-20' fill='blue' />
            <div className='h-[calc(100vh-12rem)] w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-black/[0.04] dark:bg-grid-white/[0.02] relative overflow-hidden'>
                <div className='p-4 max-w-7xl text-center mx-auto z-10 w-full pt-20 md:pt-0'>
                    <div className='text-4xl md:text-7xl py-2 font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground bg-opacity-50'>
                        <h1 className='uppercase'>{siteConfig.name}</h1>
                        <span className='text-3xl md:text-6xl'>
                            Belajar Pemrograman Web
                        </span>
                    </div>
                    <p className='mt-5 mb-10 font-normal text-base text-muted-foreground max-w-lg text-center mx-auto'>
                        Bagi anda yang ingin berusaha mengembangkan diri dalam bidang
                        pemrograman dan web development.
                    </p>
                    <Highlight className='text-4xl font-bold font-mono px-4 py-2'>
                        Dari Null
                    </Highlight>
                    <div className='w-full justify-center flex items-center gap-4 mt-6 md:mt-10'>
                        <Link
                            href={route('articles.index')}
                            className={buttonVariants({ variant: 'outline', size: 'lg' })}
                        >
                            <Book />
                            Cari Artikel
                        </Link>
                        <Link
                            href={route('projects.index')}
                            className={buttonVariants({ variant: 'outline', size: 'lg' })}
                        >
                            <BookCopy />
                            Cari Project
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

Home.layout = (page: any) => <AppLayout children={page} />
