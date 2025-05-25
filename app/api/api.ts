export async function make_api_call<T = unknown>({
  url,
  method = 'GET',
  headers = {},
  params = {},
  body = null,
}: {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: T | null;
}): Promise<{
  success: boolean;
  data: T | null;
  error: string | null;
}> {
  try {
    // Construct URL with query parameters if provided
    let finalUrl = url;
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      ).toString();
      finalUrl = `${url}?${queryString}`;
    }

    // Set default headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Prepare fetch options
    const options: RequestInit = {
      method,
      headers: defaultHeaders,
    };

    // Include body for POST/PUT requests
    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(finalUrl, options);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    // Parse response data
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
