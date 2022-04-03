<?php

namespace App\Mail;

use App\Models\Client;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailClientList extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $admin)
    {
        $this->admin = $admin;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $today = \Carbon\Carbon::now()->format('d.m.Y');
        $startOfTheWeek = \Carbon\Carbon::now()->subDays(7)->format('d.m.Y');
        $emailSubject = 'Your Client Details for the week starting from '.$startOfTheWeek.' to '.$today;
        $clientDetails = Client::select('id','first_name','surname','email')->where('admin_id',$this->admin->id)->get()->toArray();

        return $this->view('emails.clientList')->subject($emailSubject)->with([
            'admin'=>$this->admin,
            'clientDetails' => $clientDetails
        ]);
    }
}
