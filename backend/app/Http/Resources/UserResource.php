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
            'email' => $this->email,
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'sources' => SourceResource::collection($this->whenLoaded('sources')),
            'authors' => AuthorResource::collection($this->whenLoaded('authors')),

        ];
    }
}
