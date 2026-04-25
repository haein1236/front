const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

async function http<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  
  const res = await fetch(BASE_URL + endpoint, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Erreur serveur");
  }

  return res.json();
}

export default http;
