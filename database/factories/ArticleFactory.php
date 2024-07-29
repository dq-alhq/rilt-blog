<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'title' => $title = fake()->sentence(),
            'slug' => str()->slug($title),
            'status' => 2,
            'description' => fake()->paragraph(1),
            'body' => fake()->paragraphs(3, true),
        ];
    }
}
