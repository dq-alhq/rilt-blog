import { useState } from 'react'

import { SearchField } from '@/components/ui'
import { router } from '@inertiajs/react'

export function Search() {
    const [search, setSearch] = useState('')
    const handleSearch = (e: any) => {
        setSearch(e)
        router.get(
            location.href,
            { search: e, page: 1 },
            { replace: true, preserveState: true }
        )
    }

    return (
        <SearchField
            aria-labelledby='search'
            placeholder='Cari ...'
            onChange={handleSearch}
            value={search}
        />
    )
}
