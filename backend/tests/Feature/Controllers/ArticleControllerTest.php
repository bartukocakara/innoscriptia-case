<?php

namespace Tests\Feature\Controllers;

use App\Models\Article;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class ArticleControllerTest extends BaseTestCase
{
    public function test_list_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('articles.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_create_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Article::factory()->make();
        $response = $this->postJson(route('articles.store'), $model->toArray());
        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_create_article_status_unproccessable_content()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $data = [
            'names' => "name",
        ];
        $response = $this->postJson(route('articles.store'), $data);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_show_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Article::factory()->create();
        $response = $this->getJson(route('articles.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_update_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Article::factory()->create();
        $modelMake = Article::factory()->make();
        $data = $modelMake->toArray();

        $response = $this->putJson(route('articles.update', $model->id), $data);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    public function test_delete_article_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Article::factory()->create();
        $response = $this->deleteJson(route('articles.destroy', $model->id));
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
