export const siteConfig = {
    name: import.meta.env.VITE_APP_NAME,
    url: 'https://spesest.vercel.app',
    description:
        ' Bagi anda yang ingin berusaha mengembangkan diri dalam bidang pemrograman dan web development.',
    author: 'dq-alhq',
    links: {
        twitter: 'https://twitter.com/dqnahdliyan',
        github: 'https://github.com/dq-alhq',
        facebook: 'https://faceook.com/diqi.nahdliyan',
        personalSite: 'https://spesest.vercel.app'
    }
}

export type SiteConfig = typeof siteConfig
