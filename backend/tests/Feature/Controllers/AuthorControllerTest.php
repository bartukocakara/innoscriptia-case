<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use App\Models\Author;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\BaseTestCase;
use Symfony\Component\HttpFoundation\Response;

class AuthorControllerTest extends BaseTestCase
{
    public function test_list_author_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('authors.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_show_author_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Author::factory()->create();
        $response = $this->getJson(route('authors.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }
}
