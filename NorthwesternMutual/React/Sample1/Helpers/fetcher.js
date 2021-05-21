export default async (url, additionalOptions = {}) => {
  const opts = {
    credentials: 'include',
    ...additionalOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(additionalOptions?.headers || {}),
    },
  };
  const pathname = new URL(url).pathname || '';

  try {
    const res = await fetch(url, opts);

    if (res.ok) {
      // return response json on success if it's a JSON
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        try {
          const data = await res.json();
          if (!data) {
            console.error(
              `[API error]: Message: Wrong data format from API,  Path: ${pathname}`,
            );
            throw new Error('error not formated json api');
          }
          return data;
        } catch (err) {
          return err;
        }
      } else {
        // return raw response if not JSON
        return res;
      }
    } else if (res.status >= 400 && res.status !== 401) {
      console.error(
        `[API error]: Message: Failed fetching API, Path: ${pathname}, Status: ${res.status}`,
      );
    }

    // return object on error
    return {
      url: url,
      is_error: true,
      status: res.status,
      response: await res.json(),
    };
  } catch (err) {
    console.error(
      `[API error]: Message: Exception when fetching API, Path: ${pathname}, Error: ${err}`,
    );
    return {
      is_error: true,
      status: 500,
      error: err,
    };
  }
};
