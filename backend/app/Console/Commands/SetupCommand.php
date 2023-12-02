<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

/**
 * Class SetupCommand
 */
class SetupCommand extends Command
{
    protected $signature = 'setup:all';

    protected $description = 'Setup data for project';

    public function handle()
    {
        Artisan::call('migrate:fresh --seed');

        Artisan::call('api:news');
        Artisan::call('api:media-stack');
        Artisan::call('api:guardian');
        Artisan::call('api:newyork-times');
    }
}
