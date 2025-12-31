'use client';

import { useAuthStore } from '@/app/store/useAuthStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import toast from 'react-hot-toast';

const CallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const githubUsername = searchParams.get('github_username');
    const email = searchParams.get('email');

    if (accessToken && refreshToken && githubUsername && email) {
      setTokens({
        accessToken,
        refreshToken,
        githubUsername,
        email,
        bounty: 0,
      });
      router.push('/');
    } else {
      router.push('/login');
    }
  }, [searchParams, router, setTokens]);
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-transparent text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p>Establishing connection with GitHub...</p>
      </div>
    </div>
  );
};

const AuthCallbackPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-transparent text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            <p>Establishing connection with GitHub...</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
};

export default AuthCallbackPage;
