<?php

namespace App\Console\Commands;

use App\Enums\SourceEnums;
use App\Jobs\GetNewsApiJob;
use App\Repositories\SourceRepository;
use Illuminate\Console\Command;

/**
 * Class NewsApiCommand
 */
class NewsApiCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get api data from NewsAPI';

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
        $item = $this->sourceRepository->findBy('name', SourceEnums::NEWS);

        if ($item) {
            GetNewsApiJob::dispatch($item->id);

            return Command::SUCCESS;
        }

        return Command::FAILURE;
    }
}
