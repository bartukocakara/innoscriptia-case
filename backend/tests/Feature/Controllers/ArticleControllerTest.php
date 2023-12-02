<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use App\Models\Article;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\BaseTestCase;
use Symfony\Component\HttpFoundation\Response;

class ArticleControllerTest extends BaseTestCase
{
    public function test_list_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('articles.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_show_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Article::factory()->create();
        $response = $this->getJson(route('articles.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }
}
