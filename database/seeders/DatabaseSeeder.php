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
//        User::factory(10)->create();

        $roleAdmin = Role::create(['name' => 'admin']);
        $roleUser = Role::create(['name' => 'user']);


        collect(["HTML", "CSS", "Javascript", "PHP", "React", "Vue", "Laravel", "Next", "Bootstrap", "Tailwind", "VSCode", "Sublime"])
            ->each(fn($tag) => Tag::insert(['name' => $tag, 'slug' => str()->slug($tag)]));

        $admin = User::factory()->create([
            'name' => 'DQ Al Haqqi',
            'username' => 'dq',
            'email' => 'dq.alhaqqi@gmail.com',
            'password' => '@Diqi1999',
        ]);
        Article::factory()->hasAttached(Tag::all()->random(3))->for($admin)->create();
        $admin->assignRole($roleAdmin);

        User::factory(10)->has(Article::factory(3)->hasAttached(Tag::all()->random(3)))->create();
    }
}
