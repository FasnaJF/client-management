<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $api_token = $request->header('api_token');
        if (strlen($api_token) == 60) {
            $user = Admin::where('api_token', $api_token)->first();

            if ($user && $user->admin_level) {
                Auth::loginUsingId($user->id);
                return $next($request);
            }
        }
        abort(401);
    }
}
