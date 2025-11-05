export function safeLoaderWithFallback<T>(
  loaderFn: () => Promise<T>,
  fallbackFn: () => T | null = () => null,
): () => Promise<T | null> {
  return async () => {
    try {
      return await loaderFn()
    } catch (err) {
      console.warn('Loader failed, returning fallback:', err)
      return fallbackFn()
    }
  }
}
