import { FacebookLogo, GithubLogo, Logo, XLogo } from '@/components/logo'
import { Button, Link, Separator } from '@/components/ui'
import { siteConfig } from '@/config/site'

export const Footer = () => (
    <footer className='p-6 container max-w-screen-2xl bg-gradient-to-t from-background to-transparent via-transparent'>
        <div className='flex items-center justify-between'>
            <Link href='/' className='items-center font-semibold uppercase flex'>
                <Logo className='mx-3 size-4' /> {siteConfig.name}
            </Link>
            <ul className='flex flex-wrap items-center justify-center'>
                <li>
                    <Link href={siteConfig.links.github}>
                        <Button size='icon' variant='ghost'>
                            <GithubLogo className='w-4 h-4' />
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link href={siteConfig.links.twitter}>
                        <Button size='icon' variant='ghost'>
                            <XLogo className='w-4 h-4' />
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link href={siteConfig.links.facebook}>
                        <Button size='icon' variant='ghost'>
                            <FacebookLogo className='w-4 h-4' />
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
        <Separator className='my-2' />
        <div className='text-sm text-muted-foreground text-center'>
            © 2024{' '}
            <Link href='/' className='hover:underline'>
                {siteConfig.name}
            </Link>
            . All Rights Reserved.
        </div>
    </footer>
)
