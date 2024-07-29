<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Article;
use App\Models\Project;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function users(Request $request)
    {
        $search = $request->input('search') ?? '';
        $perPage = $request->input('per-page') ?? 10;
        $users = User::query()
            ->where('username', 'like', "%{$search}%")
            ->orWhere('name', 'like', "%{$search}%")
            ->select('id', 'username', 'name', 'email', 'email_verified_at', 'created_at')
            ->paginate($perPage)
            ->withQueryString();
        return inertia('admin/users', [
            'users' => UserResource::collection($users),
        ]);
    }

    public function delete_user(User $user)
    {
        dd($user);
    }

    public function articles(Request $request)
    {
        $search = $request->search ?? '';
        $articles = Article::query()
            ->select(['id', 'title', 'description', 'slug', 'user_id', 'status', 'created_at'])
            ->where('title', 'like', "%{$search}%")
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return inertia('admin/articles', [
            'articles' => ArticleResource::collection($articles)
        ]);
    }

    public function projects(Request $request)
    {
        $search = $request->search ?? '';
        $projects = Project::query()
            ->select(['id', 'title', 'description', 'slug', 'status', 'user_id', 'created_at'])
            ->where('title', 'like', "%{$search}%")
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return inertia('admin/projects', [
            'projects' => ArticleResource::collection($projects)
        ]);
    }

    public function publish_request()
    {
        $pending_articles = Article::query()->wherePending()->select(['id', 'title', 'description', 'slug', 'user_id', 'created_at'])->paginate(5);
        $pending_projects = Project::query()->wherePending()->select(['id', 'title', 'description', 'slug', 'user_id', 'created_at'])->paginate(5);
        return inertia('admin/publish-request', [
            'pending_articles' => ArticleResource::collection($pending_articles),
            'pending_projects' => ProjectResource::collection($pending_projects),
        ]);
    }

    public function publish_article(Article $article)
    {
        $article->update([
            'status' => StatusEnum::PUBLISHED,
        ]);
        return back()->with('message', 'Artikel dipublish');
    }

    public function reject_article(Article $article)
    {
        $article->update([
            'status' => StatusEnum::UNPUBLISHED,
        ]);
        return back()->with('message', 'Artikel ditolak');
    }

    public function publish_project(Project $project)
    {
        $project->update([
            'status' => StatusEnum::PUBLISHED,
        ]);
        return back()->with('message', 'Project dipublish');
    }

    public function reject_project(Project $project)
    {
        $project->update([
            'status' => StatusEnum::UNPUBLISHED,
        ]);
        return back()->with('message', 'Project ditolak');
    }

    public function set_user(User $user)
    {
        if ($user->id === auth()->user()->id) {
            return back()->with('message', 'Tidak bisa merubah role diri sendiri');
        } else {
            $user_role = Role::query()->where('name', 'user')->first();
            $user->roles()->detach();
            $user->assignRole($user_role);
            return back()->with('message', 'User ditetapkan sebagai user');
        }
    }

    public function set_admin(User $user)
    {
        if ($user->id === auth()->user()->id) {
            return back()->with('message', 'Tidak bisa merubah role diri sendiri');
        } else {
            $admin_role = Role::query()->where('name', 'admin')->first();
            $user->roles()->detach();
            $user->assignRole($admin_role);
            return back()->with('message', 'User ditetapkan sebagai admin');
        }
    }
}
