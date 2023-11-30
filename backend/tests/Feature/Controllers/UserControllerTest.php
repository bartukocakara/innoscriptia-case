<?php

namespace Tests\Feature\Controllers;

use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class UserControllerTest extends BaseTestCase
{
    public function test_list_user_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('users.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_create_user_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = User::factory()->make();
        $response = $this->postJson(route('users.store'), $model->toArray());
        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_create_user_status_unproccessable_content()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $data = [
            'names' => "name",
        ];
        $response = $this->postJson(route('users.store'), $data);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_show_user_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = User::factory()->create();
        $response = $this->getJson(route('users.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_update_user_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = User::factory()->create();
        $modelMake = User::factory()->make();
        $data = $modelMake->toArray();

        $response = $this->putJson(route('users.update', $model->id), $data);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    public function test_delete_user_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = User::factory()->create();
        $response = $this->deleteJson(route('users.destroy', $model->id));
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
