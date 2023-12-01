<?php

namespace App;

use App\Services\Api\NewyorkTimesApiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

/**
 * Class GetNewyorkTimesApiJob
 */
class GetNewyorkTimesApiJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $sourceId;

    /**
     * Create a new job instance.
     */
    public function __construct($sourceId)
    {
        $this->sourceId = $sourceId;
    }

    /**
     * Execute the job.
     */
    public function handle(NewyorkTimesApiService $newyorkTimesApiService): void
    {
        $newyorkTimesApiService->getData($this->sourceId);
    }
}