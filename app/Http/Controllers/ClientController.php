<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientCreateRequest;
use App\Http\Requests\ClientUpdateRequest;
use App\Models\Admin;
use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class ClientController extends BaseController
{

    private $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->middleware('admin');
        $this->clientService = $clientService;
    }


    public function index()
    {
        $user = Auth::user();
        $clients = $this->clientService->getAllClientsByUser($user->id);
        
        if($clients->count() == 0){
            return response()->json("You don't have any clients yet");

        }
        return response()->json($clients);
    }

    public function createClient(ClientCreateRequest $request)
    {        
        $clientDetails = $request->validated();
        $clientDetails['profile_picture'] = $this->imageUpload($request->profile_picture);
        $client = $this->clientService->storeClient(null,$clientDetails);

        return response()->json($client);
    }

    public function updateClient(ClientUpdateRequest $request)
    {
        
        $clientDetails = $request->validated();

        if ($request->hasFile('profile_picture')) {
            $clientDetails['profile_picture']  = $this->imageUpload($request->profile_picture);
        }

        $client = $this->clientService->storeClient($clientDetails['id'],$clientDetails);

        return response()->json($client);
    }

    public function deleteClient($id)
    {
        return response()->json($this->clientService->deleteClient($id));
    }

    public function getClient($id)
    {
        return response()->json($this->clientService->getClientById($id));
    }

    private function imageUpload($image)
    {
        $filename = time() . rand(5, 5) . '.' . $image->getClientOriginalExtension();
        $image->move('images/', $filename);

        return $filename;
    }
}
