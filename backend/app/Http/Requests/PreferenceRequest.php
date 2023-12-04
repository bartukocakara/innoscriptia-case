<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PreferenceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source_ids' => 'array',
            'source_ids.*' => 'uuid|exists:sources,id',
            'category_ids' => 'array',
            'category_ids.*' => 'uuid|exists:categories,id',
            'author_ids' => 'array',
            'author_ids.*' => 'uuid|exists:authors,id'
        ];
    }
}
