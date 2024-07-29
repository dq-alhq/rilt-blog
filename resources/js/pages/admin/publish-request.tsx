import UserLayout from '@/layouts/user-layout'
import ArticleRequest from '@/pages/admin/article-request'
import ProjectRequest from '@/pages/admin/project-request'
import { Head } from '@inertiajs/react'

export default function PublishRequest(props: any) {
    const {
        data: articles,
        meta: article_meta,
        links: article_links
    } = props.pending_articles
    const {
        data: projects,
        meta: project_meta,
        links: project_links
    } = props.pending_projects
    return (
        <div className='grid w-full gap-4'>
            <Head title='Publish Requests' />
            <ArticleRequest
                articles={articles}
                meta={article_meta}
                links={article_links}
            />
            <ProjectRequest
                projects={projects}
                meta={project_meta}
                links={project_links}
            />
        </div>
    )
}

PublishRequest.layout = (page: any) => <UserLayout children={page} />
