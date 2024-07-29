<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Project;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $article_count = Article::query()->whereBelongsToMe()->count();
        $project_count = Project::query()->whereBelongsToMe()->count();
        $latest_article = Article::query()->whereBelongsToMe()->latest()->pluck('created_at')->first();
        $latest_project = Project::query()->whereBelongsToMe()->latest()->pluck('created_at')->first();
        return inertia('dashboard', [
            'article_count' => $article_count ?? 0,
            'project_count' => $project_count ?? 0,
            'latest_article' => $latest_article ? $latest_article->format('d F Y') : 'Belum ada',
            'latest_project' => $latest_project ? $latest_project->format('d F Y') : 'Belum ada',
        ]);
    }
}
