<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }


    public function index($userId)
    {

        $clients = Client::where('admin_id', $userId)->get();
        return $clients->toJson();


    }

    public function createClient(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => ['required',
                'string',
                'email',
                'max:255',
                'unique:clients,email',
            ],
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validation->fails()) {
            return json_encode(["status" => 500, "errors" => $validation->errors()]);
        }

        $profile_picture = $request->profile_picture;
        $filename = time() . rand(5, 5) . '.' . $profile_picture->getClientOriginalExtension();
        $profile_picture->move('images/', $filename);

        $userDetails = [
            'first_name' => $request->first_name,
            'surname' => $request->surname,
            'email' => $request->email,
            'profile_picture' => $filename,
            'admin_id' => $request->admin_id
        ];

        $client = Client::create($userDetails);

        if ($client) {
            return response()->json(["status" => 200, "message" => "Client details added successfully", "data" => $client]);

        } else {
            return response()->json(["status" => 500, "message" => "failed to add the client"]);
        }
    }

    public function updateClient(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => ['required',
                'string',
                'email',
                'max:255',
                'unique:clients,email,' . $request->id
            ],
        ]);

        if ($validation->fails()) {
            return response()->json(["status" => 500, "errors" => $validation->errors()]);
        }

        if ($request->hasFile('profile_picture')) {
            $validation = Validator::make($request->all(), [
                'profile_picture' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048']);

            if ($validation->fails()) {
                return response()->json(["status" => 500, "errors" => $validation->errors()]);
            }

            $profile_picture = $request->profile_picture;
            $filename = time() . rand(5, 5) . '.' . $profile_picture->getClientOriginalExtension();
            $profile_picture->move('images/', $filename);

        } else {
            $filename = $request->profile_picture;
        }


        $userDetails = [
            'first_name' => $request->first_name,
            'surname' => $request->surname,
            'email' => $request->email,
            'profile_picture' => $filename
        ];

        $client = Client::where('id', $request->id)->update($userDetails);

        if ($client) {
            return response()->json(["status" => 200, "message" => "Client details updated successfully", "data" => $client]);

        } else {
            return response()->json(["status" => 500, "message" => "failed to update the client"]);
        }

    }

    public function deleteClient($id)
    {

        $client = Client::find($id);
        if (!is_null($client)) {
            $delete_status = Client::where("id", $id)->delete();
            if ($delete_status == 1) {
                return response()->json(["status" => 200, "success" => true, "message" => "client record deleted successfully"]);
            } else {
                return response()->json(["status" => 500, "message" => "failed to delete, please try again"]);
            }
        } else {
            return response()->json(["status" => 500, "message" => "Whoops! no client found with this id"]);
        }

    }
}
