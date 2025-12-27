import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

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
    const defaultHeaders = {
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

        return make_api_call<T>({
          url,
          method,
          headers,
          params,
          body,
          retry: false,
        });
      }
      clearUser();
      throw new Error('Session expired. Please login again.');
    }

    if (response.status === 422) {
      const errorData = await response.json().catch(() => ({}));
      const message = 'Please link your GitHub account to continue.';

      toast.error(message);

      throw new Error(message);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json().catch(() => ({}));

    return {
      success: true,
      data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
