<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $api_token = $request->header('api_token');
        $user = Admin::where('api_token', $api_token)->whereNotNull('api_token')->first();
        
        if ($user && $user->admin_level) {
            Auth::loginUsingId($user->id);
            return $next($request);
        }

        abort(401);
    }
}
