function GetIcon({ filetype }: { filetype: string }) {
    switch (filetype) {
        case 'js':
            return 'javascript'
        case 'ts':
            return 'typescript'
        case 'jsx':
            return 'react'
        case 'tsx':
            return 'react'
        case 'php':
            return 'php'
        case 'html':
            return 'html'
        case 'css':
            return 'css'
        case 'astro':
            return 'astro'
        case 'vue':
            return 'vue'
        case 'blade':
            return 'laravel'
        case 'json':
            return 'nodejs'
        default:
            return 'bash'
    }
}

export function FileIcon({ filetype }: { filetype: string }) {
    const fileIcon = GetIcon({ filetype: filetype })
    return (
        <div className='size-5 flex items-center'>
            <img src={`/svgs/${fileIcon}.svg`} alt={fileIcon} className='size-5 invert' />
        </div>
    )
}
