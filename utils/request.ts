// apiClient.ts
type RequestOptions = {
  headers?: HeadersInit;
  body?: any;
};

const BASE_URL = 'http://192.168.1.20:3000/api';

const fetchWithTimeout = (url, options, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout),
    ),
  ]);
};

async function handleResponse(response: Response) {
  return response.json();
}

async function get(endpoint: string, options: RequestOptions = {}) {
  const { headers } = options;
  const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  return handleResponse(response);
}

async function post(endpoint: string, body: any, options: RequestOptions = {}) {
  const { headers } = options;
  const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

async function put(endpoint: string, body: any, options: RequestOptions = {}) {
  const { headers } = options;
  const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

async function del(endpoint: string, options: RequestOptions = {}) {
  const { headers } = options;
  const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  return handleResponse(response);
}

export { get, post, put, del };

