import { Config } from 'ziggy-js'

export interface User {
    id: number
    name: string
    username: string
    email: string
    admin: boolean
    verified: boolean
    avatar: string
    joined: string
    articles: Article[]
    projects: Project[]
    articles_created: number
    projects_created: number
}

export interface Article {
    id: number
    slug: string
    title: string
    description: string
    body: string
    created_at: string
    status: 0 | 1 | 2
    user_id: number
    author: User
    tags: Tag[]
    project: Project
    chapter: number
    bookmarks: Bookmark[]
}

export interface Project {
    id: number
    slug: string
    title: string
    description: string
    image: string
    created_at: string
    status: 0 | 1 | 2
    user_id: number
    author: User
    articles: Article[]
    tags: Tag[]
    article_count: number
}

export interface Tag {
    id: number
    name: string
    slug: string
    articles: Article[]
    articles_count: number
    projects_count: number
    projects: Project[]
}

export interface Bookmark {
    id: number
    user_id: number
    created_at: string
    updated_at: string
    articles: Article[]
    user: User
}

export interface FormSetting {
    method: 'POST' | 'PUT'
    action: string
    title: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
    ziggy: Config & { location: string }
    message: string
}
