<?php

namespace App\Http\Controllers;


use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller as BaseController;


class AdminController extends BaseController
{

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function registerUser(Request $request): string
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => [
                'required_with:confirm_email',
                'same:confirm_email',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'confirm_email' => 'string|email|max:255',
            'password' => 'required_with:confirm_password|same:confirm_password|min:6',
            'confirm_password' => 'min:6'
        ]);
        if ($validation->fails()) {
            return json_encode(["status" => 500, "message" => "You need to enter all fields", "errors" => $validation->errors()]);
        }

        $userDetails = [
            'first_name' => $request->first_name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ];

        $user = Admin::create($userDetails);

        if ($user) {
            return json_encode(["status" => 200, "message" => "You have registered successfully", "data" => $user]);
        } else {
            return json_encode(["status" => 500, "message" => "failed to register"]);
        }
    }

    public function loginUser(Request $request)
    {
        $validation = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]
        );
        if ($validation->fails()) {
            return json_encode(["status" => 500, "errors" => $validation->errors()]);
        }

        $user = Admin::where('email', $request->email)->first();
        if (!$user) {
            return json_encode(["status" => 500, "message" => "Unable to login. Email doesn't exist."]);
        }
        $user->api_token = Str::random(60);
        $user->save();


        $credentials = $request->except(['_token']);

        if (Auth::attempt($credentials)) {
            return json_encode(["status" => 200, "message" => "You have logged in successfully", "data" => $user]);
        } else {
            return json_encode(["status" => 500, "message" => "Unable to login. Incorrect password."]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        if ($request->wantsJson()) {
            return response()->json([], 204);
        }
    }
}
