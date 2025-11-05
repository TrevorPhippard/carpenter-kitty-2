import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { Post } from '@/types/post'
import { getPosts } from '@/lib/api'

export function usePosts() {
  const queryClient = useQueryClient()

  const {
    data: posts = [],
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery<Array<Post>, Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60, // 1 minute cache
  })

  // Optionally expose a helper to manually invalidate/refetch
  function invalidatePosts() {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }

  return {
    posts,
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
    invalidatePosts,
  }
}
