import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true
        }),
        react()
    ],
    resolve: {
        alias: {
            ui: resolve('@/components/ui'),
            'ziggy-js': resolve('@/tightenco/ziggy')
        }
    }
})
