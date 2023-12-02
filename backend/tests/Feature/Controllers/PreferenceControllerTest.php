<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use App\Models\Preference;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\BaseTestCase;
use Symfony\Component\HttpFoundation\Response;

class PreferenceControllerTest extends BaseTestCase
{
    public function test_list_preference_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('preferences.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_create_preference_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Preference::factory()->make();
        $response = $this->postJson(route('preferences.store'), $model->toArray());
        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_create_preference_status_unproccessable_content()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $data = [
            'names' => "name",
        ];
        $response = $this->postJson(route('preferences.store'), $data);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_show_preference_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Preference::factory()->create();
        $response = $this->getJson(route('preferences.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_delete_preference_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Preference::factory()->create();
        $response = $this->deleteJson(route('preferences.destroy', $model->id));
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
