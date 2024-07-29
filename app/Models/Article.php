<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'body',
        'status',
        'project_id',
        'chapter'
    ];

    protected function casts(): array
    {
        return [
            'status' => StatusEnum::class,
            'created_at' => 'date',
        ];
    }

    public function scopeWhereBelongsToProject(Builder $builder, Project $project): Builder
    {
        return $builder->where('project_id', $project->id);
    }

    public function scopeWhereUnpublished(Builder $builder): Builder
    {
        return $builder->where('status', StatusEnum::UNPUBLISHED);
    }

    public function scopeWherePending(Builder $builder): Builder
    {
        return $builder->where('status', StatusEnum::PENDING);
    }

    public function scopeWherePublished(Builder $builder): Builder
    {
        return $builder->where('status', StatusEnum::PUBLISHED);
    }

    public function scopeWhereBelongsToMe(Builder $builder): Builder
    {
        return $builder->whereBelongsTo(auth()?->user());
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->select(['id', 'name']);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class)->select(['id', 'title', 'slug']);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
