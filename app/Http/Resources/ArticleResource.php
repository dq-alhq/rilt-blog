<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
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
            'created_at' => $this->created_at->format('d F Y'),
            'status' => $this->status,
            'author' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'project' => $this->project->slug ?? null,
            'chapter' => $this->chapter ?? null
        ];
    }
}
