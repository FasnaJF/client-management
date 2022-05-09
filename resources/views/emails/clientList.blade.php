Hi {{$admin->first_name}},

This is your weekly update on clients.

@forelse($clientDetails as $client)
First Name: {{$client['first_name']}}, Surname: {{$client['surname']}}, Email: {{$client['email']}}
@empty
You don't have any clients yet.
@endforelse

Best Regards,<br>