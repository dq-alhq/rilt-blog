<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'tags' => TagResource::collection($this->tags),
            'created_at' => $this->created_at->format('d F Y'),
            'author' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'status' => $this->status,
            'articles_count' => $this->articles->count(),
        ];
    }
}
