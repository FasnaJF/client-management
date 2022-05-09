<?php

namespace App\Console\Commands;

use App\Mail\EmailClientList;
use App\Models\Admin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendWeeklyEmailToAdmin extends Command
{
    protected $signature = 'email:admin';

    protected $description = 'Email each admin\'s client list on weekly basis';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Admin::all()->each(fn ($admin) => Mail::to($admin)->send(new EmailClientList($admin)));
    }
}
