import { Config } from 'ziggy-js'

export interface User {
    id: number
    name: string
    username: string
    email: string
    email_verified_at: string
    avatar: string
    articles: Article[]
    projects: Project[]
}

export interface Article {
    id: number
    slug: string
    title: string
    description: string
    content: string
    created_at: string
    published: boolean
    user_id: number
    user: User
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
    published: boolean
    user_id: number
    user: User
    articles: Article[]
    tags: Tag[]
}

export interface Tag {
    id: number
    name: string
    slug: string
    articles: Article[]
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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
    ziggy: Config & { location: string }
}
