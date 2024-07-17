import { Provider } from '@/components/providers'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'

import '../css/app.css'
import './bootstrap'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const appElement = (
            <Provider>
                <App {...props} />
            </Provider>
        )
        if (import.meta.env.DEV) {
            createRoot(el).render(appElement)
            return
        }

        hydrateRoot(el, appElement)
    },
    progress: {
        color: '#4B5563'
    }
})
