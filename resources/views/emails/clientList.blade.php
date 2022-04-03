Hi {{$admin->first_name}},

This is your weekly update on clients.
@foreach($clientDetails as $client)
    First Name: {{$client['first_name']}}, Surname: {{$client['surname']}}, Email: {{$client['email']}}
@endforeach

Best Regards,<br>
