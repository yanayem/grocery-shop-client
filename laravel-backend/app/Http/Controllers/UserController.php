<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function syncUser(Request $request)
    {
        $userInfo = $request->user_info;

        if (!$userInfo || !isset($userInfo['uid'])) {
            return response()->json(['message' => 'Missing user information'], 400);
        }

        // Find existing user to preserve role, or default to customer
        $existingUser = User::where('firebase_uid', $userInfo['uid'])->first();
        $role = $existingUser ? $existingUser->role : 'customer';

        // Hardcoded admin check
        if (strtolower($userInfo['email']) === 'admin@gmail.com') {
            $role = 'admin';
        }

        $user = User::updateOrCreate(
            ['firebase_uid' => $userInfo['uid']],
            [
                'name' => $userInfo['name'] ?? explode('@', $userInfo['email'])[0],
                'email' => $userInfo['email'],
                'role' => $role
            ]
        );

        return response()->json($user);
    }

    public function getProfile(Request $request)
    {
        $user = User::where('firebase_uid', $request->user_info['uid'])->first();
        return response()->json($user);
    }
}
