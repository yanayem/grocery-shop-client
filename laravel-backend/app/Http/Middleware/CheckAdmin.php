<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user_info || (!isset($request->user_info['uid']) && !isset($request->user_info['is_local_admin']))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Bypass if it's the local admin authenticated via master key
        if (isset($request->user_info['is_local_admin']) && $request->user_info['is_local_admin'] === true) {
            return $next($request);
        }

        $user = User::where('firebase_uid', $request->user_info['uid'])->first();

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Admin access required'], 403);
        }

        return $next($request);
    }
}
