import React from 'react'

import CopyButton from '@/components/copy-button'
import { FileIcon } from '@/components/file-icon'
import { cn, slugify } from '@/lib/utils'
import 'highlight.js/styles/night-owl.min.css'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
    content: string
    className?: string
}

export const Markdown: React.FC<MarkdownContentProps> = ({ content, className }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h2: ({ children }) => (
                    <h2 className='scroll-mt-24' id={slugify(children as string)}>
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className='scroll-mt-24' id={slugify(children as string)}>
                        {children}
                    </h3>
                ),

                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const id = (Math.floor(Math.random() * 100) + 1).toString()
                    if (match?.length) {
                        return (
                            <div className='bg-gradient-dark'>
                                <div className='flex items-center justify-between px-4 py-1 md:py-2 border-b border-zinc-700 dark:border-border'>
                                    <div className='flex items-center gap-3'>
                                        <FileIcon filetype={match[1]} />
                                        <span className='text-xs text-white font-sans'>
                                            {/* @ts-ignore  */}
                                            {node?.data?.meta}
                                        </span>
                                    </div>
                                    <CopyButton id={id} />
                                </div>
                                <div className='overflow-auto w-full'>
                                    <div
                                        className='p-5 text-xs md:text-sm font-mono'
                                        id={id}
                                    >
                                        {children}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <code
                                className='break-words before:hidden after:hidden text-sm bg-dark/10 border-dark/30 border px-1 py-0.5 md:rounded'
                                {...props}
                            >
                                {children}
                            </code>
                        )
                    }
                }
            }}
            className={cn(
                'prose dark:prose-invert prose-pre:p-0 prose-pre:-mx-5 prose-pre:-my-2 md:prose-pre:m-0 rounded-none md:prose-pre:rounded-xl prose-pre:border',
                className
            )}
        >
            {content}
        </ReactMarkdown>
    )
}
