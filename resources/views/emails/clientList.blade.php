Hi {{$admin->first_name}},

This is your weekly update on clients.
@if(empty($clientDetails))
You don't have any clients yet.
@else
@foreach($clientDetails as $client)
First Name: {{$client['first_name']}}, Surname: {{$client['surname']}}, Email: {{$client['email']}}
@endforeach
@endif


Best Regards,<br>