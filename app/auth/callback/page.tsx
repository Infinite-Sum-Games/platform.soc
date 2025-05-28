'use client';

import { useAuthStore } from '@/app/store/useAuthStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function AuthCallback() {
  return (
    <Suspense>
      <AuthCallbackContent />
    </Suspense>
  );
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    const github_username = searchParams.get('github_username');
    const email = searchParams.get('email');
    const bounty = searchParams.get('bounty');

    if (access_token && refresh_token && github_username && email && bounty) {
      // Store user data in auth store.
      setUser({
        access_token,
        refresh_token,
        github_username,
        email,
        bounty: Number(bounty),
      });

      // Close the popup and notify the parent window.
      window.opener.postMessage(
        { type: 'AUTH_SUCCESS' },
        window.location.origin,
      );
      window.close();
    }
  }, [searchParams, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Processing authentication...
        </h1>
        <p className="mt-2 text-gray-600">
          Please wait while we complete the sign-in process.
        </p>
      </div>
    </div>
  );
}
