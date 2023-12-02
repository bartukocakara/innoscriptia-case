<?php

namespace App\Console\Commands;

use App\Enums\SourceEnums;
use App\Jobs\GetNewyorkTimesApiJob;
use App\Repositories\SourceRepository;
use Illuminate\Console\Command;

/**
 * Class NewyorkTimesApiCommand
 */
class NewyorkTimesApiCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:newyork-times';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get api data from Newyork Times';

    private SourceRepository $sourceService;

    public function __construct(SourceRepository $sourceService)
    {
        parent::__construct();

        $this->sourceService = $sourceService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $item = $this->sourceService->findBy('name', SourceEnums::NEWYORK_TIMES);

        if ($item) {

            GetNewyorkTimesApiJob::dispatch($item->id);

            return Command::SUCCESS;
        }

        return Command::FAILURE;
    }
}
