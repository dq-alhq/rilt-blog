<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'verified' => $this->email_verified_at ? $this->email_verified_at->format('d F Y') : 'Not Verified',
            'joined' => $this->created_at->format('d F Y'),
            'admin' => $this->isAdmin() ? 'admin' : null,
            'avatar' => $this->avatar(),
            'articles_created' => $this->articles->count(),
            'projects_created' => $this->projects->count(),
        ];
    }
}
