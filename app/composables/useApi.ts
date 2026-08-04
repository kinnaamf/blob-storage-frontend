export function useApi() {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: config.apiBase,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    }
  })

  return {
    apiFetch
  };
}