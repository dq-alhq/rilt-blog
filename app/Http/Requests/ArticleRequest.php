<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'body' => ['required', 'string'],
            'project_id' => ['nullable', 'exists:projects,id'],
            'chapter' => ['required_with:project_id', 'numeric', Rule::unique('articles', 'chapter')->where(fn($query) => $query->where('project_id', $this->project_id))->ignore($this->article)],
        ];
    }
}
