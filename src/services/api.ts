export const apiFetch = async<T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}