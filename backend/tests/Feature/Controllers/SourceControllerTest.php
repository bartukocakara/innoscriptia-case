<?php

namespace Tests\Feature\Controllers;

use App\Models\Source;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class SourceControllerTest extends BaseTestCase
{
    public function test_list_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('sources.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_create_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Source::factory()->make();
        $response = $this->postJson(route('sources.store'), $model->toArray());
        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_create_source_status_unproccessable_content()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $data = [
            'names' => "name",
        ];
        $response = $this->postJson(route('sources.store'), $data);
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_show_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Source::factory()->create();
        $response = $this->getJson(route('sources.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_update_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Source::factory()->create();
        $modelMake = Source::factory()->make();
        $data = $modelMake->toArray();

        $response = $this->putJson(route('sources.update', $model->id), $data);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    public function test_delete_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Source::factory()->create();
        $response = $this->deleteJson(route('sources.destroy', $model->id));
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
