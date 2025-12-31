import { useAuthStore } from '@/app/store/useAuthStore';
import { toast } from 'react-hot-toast';

export async function make_api_call<T = unknown>({
  url,
  method = 'GET',
  headers = {},
  params = {},
  body = null,
  retry = true,
}: {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: T | Record<string, string> | null;
  retry?: boolean;
}): Promise<{
  success: boolean;
  data: T | null;
  error: string | null;
}> {
  const { user, setTokens, clearUser } = useAuthStore.getState();

  try {
    let finalUrl = url;
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      ).toString();
      finalUrl = `${url}?${queryString}`;
    }

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const options: RequestInit = {
      method,
      headers: defaultHeaders,
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(finalUrl, options);

    // INVALID CREDENTIALS 401
    if (response.status === 401 && url.includes('/auth/login')) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Invalid email or password');
    }

    // TOKEN EXPIRED 401
    if (response.status === 401 && retry && user?.refreshToken) {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
          },
        },
      );

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData.accessKey;

        setTokens({
          ...user,
          accessToken: newAccessToken,
        });

        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return make_api_call<T>({
          url,
          method,
          headers: newHeaders,
          params,
          body,
          retry: false,
        });
      }
      clearUser();
      throw new Error('Session expired. Please login again.');
    }

    // GITHUB ACCOUNT NOT LINKED 422
    if (response.status === 422) {
      throw new Error('Please link your GitHub account to continue.');
    }

    // INTERNAL SERVER ERROR 500
    if (response.status === 500) {
      throw new Error('Server error. Please try again later.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`,
      );
    }

    const data = await response.json().catch(() => ({}));

    return {
      success: true,
      data,
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    toast.error(message);

    return {
      success: false,
      data: null,
      error: message,
    };
  }
}
