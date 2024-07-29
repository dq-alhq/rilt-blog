<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Tag $tag = null)
    {
        $tags = Tag::withCount(['projects', 'articles'])->paginate(10);
        return inertia('tags/index', [
            'tags' => TagResource::collection($tags),
            'tag' => $tag ?? new Tag(),
            'form_setting' => [
                'action' => $tag ? route('tags.update', $tag) : route('tags.store'),
                'method' => $tag ? 'PUT' : 'POST',
                'title' => $tag ? 'Edit Tag' : 'Buat Tag Baru',
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->index();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:tags',
        ]);
        Tag::create([
            'name' => $request->name,
            'slug' => str()->slug($request->name),
        ]);
        return to_route('tags.index')->with('message', 'Tag baru ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
//
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        return $this->index($tag);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'required|unique:tags,name,' . $tag->id,
        ]);
        $tag->update([
            'name' => $request->name,
            'slug' => str()->slug($request->name),
        ]);
        return to_route('tags.index')->with('message', 'Tag diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        //
    }
}
