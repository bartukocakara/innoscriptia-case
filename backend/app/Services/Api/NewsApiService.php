<?php

namespace App\Services\Api;

use Exception;
use App\Enums\AuthorEnums;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * Class NewsApiService
 */
class NewsApiService extends BaseApiService
{
    public function getUrl(): string
    {
        return config('services.news_api.url').'/top-headlines?country=us&apiKey='.config('services.news_api.api_key');
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

            $items = $response->json()['articles'];

            if (empty($items)) {
                Log::warning('No data available in the API response');

                return false;
            }

            collect($items)->map(function ($item) use ($sourceId) {
                if (! empty($item->author)) {
                    $fistAuthor = explode(',', $item->author)[0];
                }

                $author = $this->authorRepository->firstOrCreate('name', [
                    'name' => $fistAuthor ?? AuthorEnums::NEWS_AUTHOR,
                ]);

                $categoryName = 'General';
                $category = $this->categoryRepository->firstOrCreate('name', [
                    'name' => $categoryName,
                    'slug' => Str::slug($categoryName),
                ]);

                $this->articleRepository->firstOrCreate('title', [
                    'source_id' => $sourceId,
                    'author_id' => $author->id,
                    'title' => $item['title'],
                    'slug' => Str::slug($item['title']),
                    'description' => $item['description'],
                    'url' => $item['url'],
                    'image' => $item['urlToImage'] ?? $this->defaultImage(),
                    'published_at' => $item['publishedAt'],
                ]);

            });

            Log::info('News API data inserted successfully!');

            return true;
        } catch (Exception $exception) {
            Log::error($exception);

            return false;
        }
    }
}
