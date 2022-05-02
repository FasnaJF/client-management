<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientCreateRequest;
use App\Http\Requests\ClientUpdateRequest;
use App\Services\ClientService;
use Illuminate\Routing\Controller as BaseController;


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
        $clients = $this->clientService->getAllClients();
        return $clients->toJson();
    }

    public function createClient(ClientCreateRequest $request)
    {
        $request->validated();

        $clientDetails = $request->all();
        $clientDetails['profile_picture'] = $this->imageUpload($request->profile_picture);
        $client = $this->clientService->createClient($clientDetails);

        return response()->json($client);
    }

    public function updateClient(ClientUpdateRequest $request)
    {
        $request->validated();
        $clientDetails = $request->all();

        if ($request->hasFile('profile_picture')) {
            $clientDetails['profile_picture']  = $this->imageUpload($request->profile_picture);
        }

        $client = $this->clientService->updateClient($clientDetails['id'],$clientDetails);

        return response()->json($client);
    }

    public function deleteClient($id)
    {
        return response()->json($this->clientService->deleteClient($id));
    }

    private function imageUpload($image)
    {
        $filename = time() . rand(5, 5) . '.' . $image->getClientOriginalExtension();
        $image->move('images/', $filename);

        return $filename;
    }
}
