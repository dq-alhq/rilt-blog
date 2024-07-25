import React from 'react'

import { Accordion, Link } from '@/components/ui'
import { cn, slugify } from '@/lib/utils'
import { ListCollapseIcon } from 'lucide-react'

export default function TableOfContents({ text }: { text: string }) {
    const lines = text.split('\n')
    const filteredLines = lines.filter(
        (line) => line.includes('##') || line.includes('###')
    )

    const activeId = useActiveItem(filteredLines)
    return (
        <Accordion>
            <Accordion.Item className='border-none'>
                <Accordion.Trigger className='w-full border rounded-lg px-3 mb-2 py-2 font-semibold text-base'>
                    <ListCollapseIcon className='size-4' /> Daftar Isi
                </Accordion.Trigger>
                <Accordion.Content className='rounded-lg border p-3'>
                    {filteredLines.length > 0 && (
                        <ul>
                            {filteredLines.map((line, index) => (
                                <React.Fragment key={index}>
                                    <TocLink line={line} activeId={activeId} />
                                </React.Fragment>
                            ))}
                        </ul>
                    )}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
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
            <Link
                className={cn(
                    'transition-colors text-sm duration-300',
                    slug === activeId ? 'text-primary' : 'text-foreground'
                )}
                href={`#${slug}`}
            >
                {trimmedLine}
            </Link>
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
