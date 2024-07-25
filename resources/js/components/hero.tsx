import { buttonVariants, Heading, Link } from '@/components/ui'
import { siteConfig } from '@/config/site'
import { BookMarkedIcon, Rocket } from 'lucide-react'
import { Header, Text } from 'react-aria-components'

export function Hero() {
    return (
        <div className='relative isolate overflow-visible bg-background container'>
            <svg
                aria-hidden='true'
                className='absolute sm:block hidden inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
            >
                <defs>
                    <pattern
                        x='50%'
                        y={-1}
                        id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
                        width={200}
                        height={200}
                        patternUnits='userSpaceOnUse'
                    >
                        <path d='M.5 200V.5H200' fill='none' />
                    </pattern>
                </defs>
                <rect
                    fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
                    width='100%'
                    height='100%'
                    strokeWidth={0}
                />
            </svg>
            <div className='py-10 sm:py-16 md:py-20'>
                <div>
                    <Header>
                        <Heading className='max-w-xl text-2xl font-bold tracking-tight lg:text-5xl mb-2 lg:mb-6'>
                            Selamat Datang
                        </Heading>
                        <Text
                            slot='description'
                            className='text-base [&_strong]:font-medium lg:text-xl max-w-2xl block leading-relaxed text-muted-fg'
                        >
                            {siteConfig.description}
                            <span className='text-2xl font-bold font-mono px-2 py-2'>
                                Dari Null
                            </span>
                        </Text>
                    </Header>
                    <div className='mt-6 flex gap-2'>
                        <Link
                            className={buttonVariants({
                                size: 'lg'
                            })}
                            href={route('articles.index')}
                        >
                            <Rocket className='size-5' />
                            Cari Artikel
                        </Link>
                        <Link
                            className={buttonVariants({
                                size: 'lg'
                            })}
                            href={route('projects.index')}
                        >
                            <BookMarkedIcon className='size-5' />
                            Cari Project
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
