<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@spesest.vercel.app',
            'password' => 'Admin#1234',
        ]);

        $roleAdmin = Role::create(['name' => 'admin']);
        $roleUser = Role::create(['name' => 'user']);
        $admin->assignRole($roleAdmin);

        collect(["HTML", "CSS", "Javascript", "PHP", "React", "Vue", "Laravel", "Next", "Bootstrap", "Tailwind", "VSCode", "Sublime"])
            ->each(fn($tag) => Tag::insert(['name' => $tag, 'slug' => str()->slug($tag)]));

        User::factory(10)->has(Article::factory(3)->hasAttached(Tag::all()->random(3)))->create();
    }
}
