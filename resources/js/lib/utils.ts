import React from 'react'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export function useMediaQuery(query: string) {
    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches)
        }

        const result = matchMedia(query)
        result.addEventListener('change', onChange)
        setValue(result.matches)

        return () => result.removeEventListener('change', onChange)
    }, [query])

    return value
}

export function slugify(string: string) {
    return string
        .normalize('NFKD')
        .replace(/[^a-z0-9 ]/gi, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase()
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

export function wait(number: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, number))
}

export const getInitials = (str: string) => {
    const allNames = str.trim().split(' ')
    return allNames.reduce((acc, curr, index) => {
        if (index === 0 || index === allNames.length - 1) {
            acc = `${acc}${curr.charAt(0).toUpperCase()}`
        }
        return acc
    }, '')
}
