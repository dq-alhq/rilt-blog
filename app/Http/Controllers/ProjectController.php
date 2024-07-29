<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectSingleResource;
use App\Http\Resources\TagResource;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search') ?? '';
        $tag = $request->input('tag') ?? '';
        $projects = Project::query()
            ->select(['id', 'title', 'description', 'slug', 'created_at', 'user_id'])
            ->wherePublished()
            ->where('title', 'like', "%{$search}%")
            ->whereHas('tags', function ($query) use ($tag) {
                if ($tag) {
                    $query->where('name', 'like', "%{$tag}%");
                }
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();
        return inertia('projects/index', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('projects/form', [
            'tags' => TagResource::collection(Tag::all()),
            'project' => new Project(),
            'form_setting' => [
                'action' => route('projects.store'),
                'method' => 'POST',
                'title' => 'Buat Project Baru',
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $project = auth()->user()->projects()->create([
            'title' => $request->title,
            'slug' => str()->slug($request->title . '-' . str()->random(4)),
            'description' => $request->description,
        ]);
        $project->tags()->sync($request->tags);
        return to_route('projects.table')->with('message', 'Project berhasil di buat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return inertia('projects/show', [
            'project' => ProjectSingleResource::make($project),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('projects/form', [
            'tags' => TagResource::collection(Tag::all()),
            'project' => $project->load(['tags' => fn($query) => $query->select(['id', 'name'])]),
            'form_setting' => [
                'action' => route('projects.update', $project),
                'method' => 'PUT',
                'title' => 'Edit Project',
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $project->update([
            'title' => $request->title,
            'slug' => str()->slug($request->title . '-' . str()->random(4)),
            'description' => $request->description,
        ]);
        $project->tags()->sync($request->tags);
        return to_route('projects.table')->with('message', 'Project berhasil di update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->articles()->count() > 0) {
            return back()->with('message', 'Project gagal di hapus, ada artikel yang terkait');
        } else {
            $project->tags()->detach();
            $project->delete();
            return back()->with('message', 'Project berhasil dihapus');
        }
    }

    public function table(Request $request)
    {
        $search = $request->search ?? '';
        $projects = Project::query()->withCount('articles')
            ->select(['id', 'title', 'description', 'slug', 'status', 'created_at', 'user_id'])
            ->whereBelongsToMe()
            ->where('title', 'like', "%{$search}%")
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return inertia('projects/table', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    public function publish(Project $project)
    {
        if ($project->status !== StatusEnum::UNPUBLISHED) {
            $project->update([
                'status' => StatusEnum::UNPUBLISHED,
            ]);
        } else {
            $project->update([
                'status' => StatusEnum::PENDING,
            ]);
        }
        return back()->with('message', 'Project ' . ($project->status === StatusEnum::UNPUBLISHED ? 'tidak dipublish' : 'dipublish (pending)'));;
    }

    public function article_table(Project $project)
    {
        $search = $request->search ?? '';
        $articles = $project->articles()
            ->select(['id', 'title', 'description', 'slug', 'user_id', 'chapter', 'created_at', 'status', 'project_id'])
            ->whereBelongsToMe()
            ->where('title', 'like', "%{$search}%")
            ->paginate(10)
            ->withQueryString();
        return inertia('articles/table', [
            'articles' => ArticleResource::collection($articles),
            'project' => $project->slug
        ]);
    }
}
