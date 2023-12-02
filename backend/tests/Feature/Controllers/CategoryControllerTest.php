<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use App\Models\Category;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\BaseTestCase;
use Symfony\Component\HttpFoundation\Response;

class CategoryControllerTest extends BaseTestCase
{
    public function test_list_category_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('categories.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_show_category_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Category::factory()->create();
        $response = $this->getJson(route('categories.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }
}
