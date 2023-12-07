<?php

namespace App\Services\Api;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * Class NewyorkTimesApiService
 */
class NewyorkTimesApiService extends BaseApiService
{
    public function getUrl(): string
    {
        return config('services.newyork_times_api.url').'/1.json?api-key='.config('services.newyork_times_api.api_key');
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

            $items = $response->json()['results'];

            if (empty($items)) {
                Log::warning('No data available in the API response');

                return false;
            }

            collect($items)->map(function ($item) use ($sourceId) {
                $author = $this->authorRepository->firstOrCreate('name', [
                    'name' => $item['byline'],
                ]);

                $category = $this->categoryRepository->firstOrCreate('name', [
                    'name' => $item['section'],
                    'slug' => Str::slug($item['section']),
                ]);

                $this->articleRepository->firstOrCreate('title', [
                    'source_id' => $sourceId,
                    'author_id' => $author->id,
                    'category_id' => $category->id,
                    'title' => $item['title'],
                    'slug' => Str::slug($item['title']),
                    'description' => $this->defaultDescription(),
                    'url' => $item['url'],
                    'image' => $this->defaultImage(),
                    'published_at' => $item['published_date'],
                ]);

            });

            Log::info(__('Newyork Times API data inserted successfully!'));

            return true;
        } catch (Exception $exception) {
            Log::error($exception);

            return false;
        }
    }
}
