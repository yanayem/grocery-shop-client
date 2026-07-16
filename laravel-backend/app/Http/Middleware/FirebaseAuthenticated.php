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

        // Bypass check for local Admin Master Key
        $masterKey = env('ADMIN_MASTER_KEY');
        if ($masterKey && $idToken === $masterKey) {
            $request->merge([
                'user_info' => [
                    'email' => env('VITE_ADMIN_EMAIL', 'admin@gmail.com'),
                    'name' => 'Local Admin',
                    'uid' => 'local_admin_id',
                    'is_local_admin' => true
                ]
            ]);
            return $next($request);
        }

        try {
            $credentials = config('firebase.projects.app.credentials');

            if (!$credentials['project_id'] || !$credentials['private_key'] || !$credentials['client_email']) {
                \Log::error('Firebase credentials missing in .env');
                return response()->json(['message' => 'Firebase configuration error'], 500);
            }

            $factory = (new Factory)->withServiceAccount($credentials);
            $auth = $factory->createAuth();
            $verifiedIdToken = $auth->verifyIdToken($idToken);

            $claims = $verifiedIdToken->claims();

            // Pass user info to request
            $request->merge([
                'user_info' => [
                    'email' => $claims->get('email'),
                    'name' => $claims->get('name') ?? $claims->get('email'),
                    'uid' => $claims->get('sub'),
                ]
            ]);

            return $next($request);
        } catch (FailedToVerifyToken $e) {
            \Log::warning('Firebase token verification failed: ' . $e->getMessage());
            return response()->json(['message' => 'Invalid token'], 401);
        } catch (\Exception $e) {
            \Log::error('Firebase Middleware Error: ' . $e->getMessage());
            return response()->json(['message' => 'Authentication error'], 401);
        }
    }
}
