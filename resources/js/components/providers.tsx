import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

import { Toaster } from '@/components/ui'
import { router } from '@inertiajs/react'
import { RouterProvider } from 'react-aria-components'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
    children: ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'inertia-ui-theme',
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'

            root.classList.add(systemTheme)
            return
        }

        const metaThemeColor = document.getElementById('theme-color-meta')
        if (metaThemeColor) {
            if (theme === 'dark') {
                metaThemeColor.setAttribute('content', '#000000')
            } else if (theme === 'light') {
                metaThemeColor.setAttribute('content', '#ffffff')
            } else if (theme === 'system') {
                if (
                    window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                ) {
                    metaThemeColor.setAttribute('content', '#000000')
                } else {
                    metaThemeColor.setAttribute('content', '#ffffff')
                }
            } else {
                metaThemeColor.setAttribute('content', '#ffffff')
            }
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        }
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

const Provider = ({ children }: { children: ReactNode }) => (
    <RouterProvider navigate={(to, options) => router.visit(to, options as any)}>
        <ThemeProvider defaultTheme='system' storageKey='vite-theme'>
            <Toaster />
            {children}
        </ThemeProvider>
    </RouterProvider>
)

const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider')

    return context
}

export {
    ThemeProvider,
    useTheme,
    Provider,
    type Theme,
    type ThemeProviderProps,
    type ThemeProviderState
}
