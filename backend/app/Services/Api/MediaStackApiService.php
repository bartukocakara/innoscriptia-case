<?php

namespace App\Services\Api;

use Exception;
use App\Enums\AuthorEnums;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * Class MediaStackApiService
 */
class MediaStackApiService extends BaseApiService
{
    public function getUrl(): string
    {
        return config('services.media_stack_api.url').'/news?access_key='.config('services.media_stack_api.api_key');
    }

    public function getData($sourceId)
    {
        try {
            $url = $this->getUrl();
            $response = Http::get($url);

            if (! $response) {
                Log::warning('No data received from the API');

                return false;
            }

            $items = $response->json()['data'];

            if (empty($items)) {
                Log::warning('No data available in the API response');

                return false;
            }

            collect($items)->map(function ($item) use ($sourceId) {

                $author = $this->authorRepository->firstOrCreate('name', [
                    'name' => $item->author ?? AuthorEnums::MEDIA_STACK_AUTHOR,
                ]);

                $category = $this->categoryRepository->firstOrCreate('name', [
                    'name' => ucfirst($item['category']),
                    'slug' => Str::slug($item['category']),
                ]);

                $this->articleRepository->firstOrCreate('title', [
                    'source_id' => $sourceId,
                    'category_id' => $category->id,
                    'author_id' => $author->id,
                    'title' => $item['title'],
                    'slug' => Str::slug($item['title']),
                    'description' => $item['description'],
                    'url' => $item['url'],
                    'image' => $item['image'] ?? $this->defaultImage(),
                    'published_at' => $item['published_at'],
                ]);

            });

            Log::info('Media Stack API data inserted successfully!');

            return true;
        } catch (Exception $exception) {
            Log::error($exception);

            return false;
        }
    }
}
