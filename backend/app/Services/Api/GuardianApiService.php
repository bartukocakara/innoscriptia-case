<?php

namespace App\Services\Api;

use Exception;
use App\Enums\AuthorEnums;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * Class GuardianApiService
 */
class GuardianApiService extends BaseApiService
{
    public function getUrl(): string
    {
        return config('services.guardian_api.url').'/search?api-key='.config('services.guardian_api.api_key');
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

            $items = $response->json()['response']['results'];

            if (empty($items)) {
                Log::warning('No data available in the API response');

                return false;
            }

            $author = $this->authorRepository->findBy('name', AuthorEnums::GUARDIAN_AUTHOR);

            collect($items)->map(function ($item) use ($sourceId, $author) {

                $category = $this->categoryRepository->firstOrCreate('name', [
                    'name' => $item['sectionName'],
                    'slug' => $item['sectionId'],
                ]);

                                $title = $item['title'] ?? $this->defaultTitle();

                $this->articleRepository->firstOrCreate('title', [
                    'source_id' => $sourceId,
                    'category_id' => $category->id,
                    'author_id' => $author->id,
                    'title' => $item['webTitle'],
                    'slug' => Str::slug($item['webTitle']),
                    'description' => $this->defaultDescription(),
                    'url' => $item['webUrl'],
                    'image' => $this->defaultImage(),
                    'published_at' => $item['webPublicationDate'],
                ]);
            });

            Log::info('Guardian API data inserted successfully!');

            return true;
        } catch (Exception $exception) {
            Log::error($exception);

            return false;
        }
    }
}
