import { Pagination as Paginate } from '@/components/ui'
import { cn } from '@/lib/utils'

export function Pagination({ meta, links, className }: any) {
    return (
        <div
            className={cn(
                'flex flex-col-reverse w-full p-6 pt-3 items-center justify-center gap-3 lg:justify-between lg:flex-row',
                className
            )}
        >
            <div className='text-sm text-muted-foreground'>
                Showing {meta.from} to {meta.to} of {meta.total}
            </div>
            <div>
                <Paginate>
                    <Paginate.Content>
                        <Paginate.Item>
                            {links.prev ? (
                                <Paginate.Previous href={links.prev} />
                            ) : (
                                <Paginate.Previous href='#' isDisabled aria-disabled />
                            )}
                        </Paginate.Item>
                        {meta.current_page !== 1 && (
                            <>
                                <Paginate.Item>
                                    <Paginate.Link href={links.first}>1</Paginate.Link>
                                </Paginate.Item>
                                {meta.current_page !== 2 && (
                                    <>
                                        <Paginate.Item>
                                            <Paginate.Ellipsis />
                                        </Paginate.Item>
                                        <Paginate.Item>
                                            <Paginate.Link href={links.prev}>
                                                {meta.current_page - 1}
                                            </Paginate.Link>
                                        </Paginate.Item>
                                    </>
                                )}
                            </>
                        )}
                        <Paginate.Item>
                            <Paginate.Link isActive href='#'>
                                {meta.current_page}
                            </Paginate.Link>
                        </Paginate.Item>
                        {meta.current_page !== meta.last_page && (
                            <>
                                {meta.current_page !== meta.last_page - 1 && (
                                    <>
                                        <Paginate.Item>
                                            <Paginate.Link href={links.next}>
                                                {meta.current_page + 1}
                                            </Paginate.Link>
                                        </Paginate.Item>
                                        <Paginate.Item>
                                            <Paginate.Ellipsis />
                                        </Paginate.Item>
                                    </>
                                )}
                                <Paginate.Item>
                                    <Paginate.Link href={links.last}>
                                        {meta.last_page}
                                    </Paginate.Link>
                                </Paginate.Item>
                            </>
                        )}
                        <Paginate.Item>
                            {links.next ? (
                                <Paginate.Next href={links.next} />
                            ) : (
                                <Paginate.Next href='#' isDisabled aria-disabled />
                            )}
                        </Paginate.Item>
                    </Paginate.Content>
                </Paginate>
            </div>
        </div>
    )
}
