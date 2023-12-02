<?php

namespace App\Console\Commands;

use App\Enums\SourceEnums;
use App\Jobs\GetGuardianApiJob;
use App\Repositories\SourceRepository;
use Illuminate\Console\Command;

/**
 * Class GuardianApiCommand
 */
class GuardianApiCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:guardian';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get api data from Guardian';

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
        $item = $this->sourceRepository->findBy('name', SourceEnums::GUARDIAN);

        if ($item) {

            GetGuardianApiJob::dispatch($item->id);

            return Command::SUCCESS;
        }

        return Command::FAILURE;
    }
}
