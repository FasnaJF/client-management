<?php

namespace App\Mail;

use App\Models\Client;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailClientList extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    public function build()
    {
        $today = Carbon::now()->format('d.m.Y');
        $startOfTheWeek = Carbon::now()->subDays(7)->format('d.m.Y');
        $emailSubject = "Your Client Details for the week starting from  $startOfTheWeek to $today";
        $clientDetails = Client::select(['id', 'first_name', 'surname', 'email'])->where('admin_id', $this->admin->id)->get();

        return $this->view('emails.clientList')->subject($emailSubject)->with([
            'admin' => $this->admin,
            'clientDetails' => $clientDetails
        ]);
    }
}
