<?php

namespace App\Console\Commands;

use App\Enums\SourceEnums;
use App\Jobs\GetMediaStackApiJob;
use App\Repositories\SourceRepository;
use Illuminate\Console\Command;

/**
 * Class MediaStackApiCommand
 */
class MediaStackApiCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:media-stack';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get api data from MediaStack';

    private SourceRepository $sourceRepository;

    public function __construct(SourceRepository $sourceRepository)
    {
        parent::__construct();

        $this->sourceRepository = $sourceRepository;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $item = $this->sourceRepository->findBy('name', SourceEnums::MEDIA_STACK);

        if ($item) {
            GetMediaStackApiJob::dispatch($item->id);

            return Command::SUCCESS;
        }

        return Command::FAILURE;

    }
}
