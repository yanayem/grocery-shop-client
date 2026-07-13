<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

class FirebaseAuthenticated
{
    public function handle(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $idToken = str_replace('Bearer ', '', $authHeader);

        try {
            $credentials = config('firebase.projects.app.credentials');

            if (!$credentials['project_id'] || !$credentials['private_key']) {
                return response()->json(['message' => 'Firebase credentials not configured in .env'], 500);
            }

            $factory = (new Factory)->withServiceAccount($credentials);
            $auth = $factory->createAuth();
            $verifiedIdToken = $auth->verifyIdToken($idToken);

            $claims = $verifiedIdToken->claims();

            // Pass user info to request
            $request->merge([
                'user_email' => $claims->get('email'),
                'user_info' => [
                    'email' => $claims->get('email'),
                    'name' => $claims->get('name'),
                    'uid' => $claims->get('sub'),
                ]
            ]);

            return $next($request);
        } catch (FailedToVerifyToken $e) {
            return response()->json(['message' => 'Token failed: ' . $e->getMessage()], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 401);
        }
    }
}
