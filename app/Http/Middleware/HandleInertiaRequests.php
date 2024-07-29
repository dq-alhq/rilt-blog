<?php

namespace App\Http\Middleware;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $tags_global = Tag::query()->select('id', 'name', 'slug')->get();
        return [
            ...parent::share($request),
            'tags_global' => cache()->rememberForever('tags_global', fn() => $tags_global),
            'auth' => [
                'user' => $request->user() ? [
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'username' => $request->user()->username,
                    'avatar' => $request->user()->avatar(),
                    'email_verified_at' => $request->user()->email_verified_at,
                    'admin' => $request->user()->isAdmin() ?? null,
                ] : null,
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'message' => fn() => $request->session()->get('message') ?: null,
        ];
    }
}
