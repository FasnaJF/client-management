<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller as BaseController;


class AdminController extends BaseController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->middleware('guest')->except('logout');
        $this->userService = $userService;
    }

    public function registerUser(UserRegisterRequest $request)
    {
        $userDetails = $request->validated();
        $userDetails['password'] =  Hash::make($request->password);

        $user = $this->userService->createUser($userDetails);
        return response()->json($user);
    }

    public function loginUser(UserLoginRequest $request)
    {
        $request->validated();
        $user = $this->userService->getUserByEmail($request->email);
        if (!$user) {
            return response()->json('This email is not registered');
        }

        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials)) {
            $userDetails['api_token'] = Str::random(60);
            $user = $this->userService->updateUserById($user->id, $userDetails);
            return response()->json($user);
        }

        return response()->json('Credentials not matched any records');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json([], 204);
    }
}
