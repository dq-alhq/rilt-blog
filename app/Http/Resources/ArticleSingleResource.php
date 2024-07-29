<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'tags' => TagResource::collection($this->tags),
            'body' => $this->body,
            'created_at' => $this->created_at->format('d F Y'),
            'author' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'chapter' => $this->chapter ?? null,
            'project' => $this->project ? ['title' => $this->project->title, 'slug' => $this->project->slug] : null,
        ];
    }
}
