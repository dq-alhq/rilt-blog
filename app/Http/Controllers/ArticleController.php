<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\TagResource;
use App\Models\Article;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? '';
        $tag = $request->tag ?? '';
        $articles = Article::query()
            ->select(['id', 'title', 'description', 'slug', 'user_id', 'created_at'])
            ->whereNull('project_id')
            ->wherePublished()
            ->where('title', 'like', "%{$search}%")
            ->whereHas('tags', function ($query) use ($tag) {
                if ($tag) {
                    $query->where('slug', $tag);
                }
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();
        return inertia('articles/index', [
            'articles' => ArticleResource::collection($articles),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('articles/form', [
            'tags' => TagResource::collection(Tag::all()),
            'article' => new Article(),
            'form_setting' => [
                'action' => route('articles.store'),
                'method' => 'POST',
                'title' => 'Buat Artikel Baru',
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create_for_project(Project $project)
    {
        return inertia('articles/form', [
            'tags' => TagResource::collection(Tag::all()),
            'article' => new Article(),
            'project_id' => $project->id,
            'form_setting' => [
                'action' => route('articles.store'),
                'method' => 'POST',
                'title' => 'Buat Artikel Baru',
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        if ($request->project_id) {
            $project = Project::find($request->project_id);
            $article = $project->articles()->create([
                'user_id' => auth()->user()->id,
                'title' => $request->title,
                'slug' => str()->slug($request->title . '-' . str()->random(4)),
                'description' => $request->description,
                'body' => $request->body,
                'chapter' => $request->chapter
            ]);
            $article->tags()->sync($request->tags);
            return to_route('projects.articles.table', $project)->with('message', 'Artikel berhasil di buat');
        } else {
            $article = auth()->user()->articles()->create([
                'title' => $request->title,
                'slug' => str()->slug($request->title . '-' . str()->random(4)),
                'description' => $request->description,
                'body' => $request->body,
            ]);
            $article->tags()->sync($request->tags);
            return to_route('articles.table')->with('message', 'Artikel berhasil di buat');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $next_article = $article->chapter ? Article::orderBy('chapter', 'asc')->where('chapter', '>', $article->chapter)->first() : null;
        $prev_article = $article->chapter ? Article::orderBy('chapter', 'desc')->where('chapter', '<', $article->chapter)->first() : null;
        return inertia('articles/show', [
            'article' => ArticleSingleResource::make($article),
            'next_article' => $next_article ? ArticleSingleResource::make($next_article) : null,
            'prev_article' => $prev_article ? ArticleSingleResource::make($prev_article) : null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return inertia('articles/form', [
            'tags' => TagResource::collection(Tag::all()),
            'article' => $article->load(['tags' => fn($query) => $query->select(['id', 'name'])]),
            'form_setting' => [
                'action' => route('articles.update', $article),
                'method' => 'PUT',
                'title' => 'Edit Artikel',
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit_for_project(Project $project, Article $article)
    {
        return inertia('articles/form', [
            'tags' => TagResource::collection(Tag::all()),
            'article' => $article->load(['tags' => fn($query) => $query->select(['id', 'name'])]),
            'project_id' => $project->id,
            'form_setting' => [
                'action' => route('articles.update', $article),
                'method' => 'PUT',
                'title' => 'Edit Artikel',
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article)
    {
        if ($request->project_id) {
            $project = Project::find($request->project_id);
            $article->update([
                'user_id' => auth()->user()->id,
                'title' => $request->title,
                'slug' => str()->slug($request->title . '-' . str()->random(4)),
                'description' => $request->description,
                'body' => $request->body,
                'chapter' => $request->chapter
            ]);
            $article->tags()->sync($request->tags);
            return to_route('projects.articles.table', $project)->with('message', 'Artikel berhasil di update');
        } else {
            $article->update([
                'title' => $request->title,
                'slug' => str()->slug($request->title . '-' . str()->random(4)),
                'description' => $request->description,
                'body' => $request->body,
            ]);
            $article->tags()->sync($request->tags);
            return to_route('articles.table')->with('message', 'Artikel berhasil di update');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->tags()->detach();
        $article->delete();
        return back()->with('message', 'Artikel berhasil di hapus');
    }

    public function table(Request $request)
    {
        $search = $request->search ?? '';
        $articles = Article::query()
            ->select(['id', 'title', 'description', 'slug', 'user_id', 'created_at', 'status'])
            ->whereNull('project_id')
            ->whereBelongsToMe()
            ->where('title', 'like', "%{$search}%")
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return inertia('articles/table', [
            'articles' => ArticleResource::collection($articles),
        ]);
    }

    public function publish(Article $article)
    {
        if ($article->status !== StatusEnum::UNPUBLISHED) {
            $article->update([
                'status' => StatusEnum::UNPUBLISHED,
            ]);
        } else {
            $article->update([
                'status' => StatusEnum::PENDING,
            ]);
        }
        return back()->with('message', 'Artikel ' . ($article->status === StatusEnum::UNPUBLISHED ? 'tidak dipublish' : 'dipublish (pending)'));
    }
}
