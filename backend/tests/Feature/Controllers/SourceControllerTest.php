<?php

namespace Tests\Feature\Controllers;

use Tests\TestCase;
use App\Models\Source;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\BaseTestCase;
use Symfony\Component\HttpFoundation\Response;

class SourceControllerTest extends BaseTestCase
{
    public function test_list_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $response = $this->getJson(route('sources.index'));
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_show_source_status_ok()
    {
        $user = $this->createUser();
        Sanctum::actingAs($user, ['*']);

        $model = Source::factory()->create();
        $response = $this->getJson(route('sources.show', $model->id));
        $response->assertStatus(Response::HTTP_OK);
    }
}
