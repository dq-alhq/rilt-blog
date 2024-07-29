import React from 'react'

import { Accordion } from '@/components/ui'
import { cn, slugify } from '@/lib/utils'
import { ListCollapseIcon } from 'lucide-react'

export default function TableOfContents({ text }: { text: string }) {
    const lines = text.split('\n')
    const filteredLines = lines.filter(
        (line) => line.includes('##') || line.includes('###')
    )

    const [open, setOpen] = React.useState(true)

    const activeId = useActiveItem(filteredLines)
    return (
        filteredLines.length > 0 && (
            <Accordion>
                <Accordion.Item className='border-0'>
                    <Accordion.Trigger className='w-full rounded-lg border px-4 py-2 mb-2'>
                        <ListCollapseIcon className='size-4' /> Daftar Isi
                    </Accordion.Trigger>
                    <Accordion.Content className='w-full rounded-lg border p-4'>
                        <ul>
                            {filteredLines.map((line, index) => (
                                <TocLink key={index} line={line} activeId={activeId} />
                            ))}
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        )
    )
}

function TocLink({ line, activeId }: { line: any; activeId: string | null }) {
    const trimmedLine = line.replace(/^#+\s*/, '').trim()
    const slug = slugify(trimmedLine)
    const isH2 = line.startsWith('## ')
    const isH3 = line.startsWith('### ')

    const indentClass = isH2 ? 'pl-0' : isH3 ? 'pl-4' : ''
    return (
        <li className={cn(indentClass)}>
            <a
                className={cn(
                    'transition-colors text-sm duration-300',
                    slug === activeId ? 'text-primary' : 'text-foreground'
                )}
                href={`#${slug}`}
            >
                {trimmedLine}
            </a>
        </li>
    )
}

function useActiveItem(filteredLines: string[]) {
    const [activeId, setActiveId] = React.useState<string | null>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let bestCandidate: IntersectionObserverEntry | null = null
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        (!bestCandidate ||
                            bestCandidate.intersectionRatio < entry.intersectionRatio)
                    ) {
                        bestCandidate = entry
                    }
                })
                if (bestCandidate) {
                    // @ts-ignore
                    setActiveId(bestCandidate.target.id)
                    // @ts-ignore
                }
            },
            { rootMargin: '0% 0% -25% 0%', threshold: 0.1 }
        )

        filteredLines.forEach((line) => {
            const trimmedLine = line.replace(/^#+\s*/, '').trim()
            const slug = slugify(trimmedLine)
            const element = document.getElementById(slug)
            if (element) observer.observe(element)
        })

        return () => {
            filteredLines.forEach((line) => {
                const trimmedLine = line.replace(/^#+\s*/, '').trim()
                const slug = slugify(trimmedLine)
                const element = document.getElementById(slug)
                if (element) observer.unobserve(element)
            })
        }
    }, [filteredLines, activeId])

    return activeId
}
