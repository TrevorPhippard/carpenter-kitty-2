import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/lib/api'

export function useCurrentUser() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
  })

  return {
    user: data,
    loading: isLoading,
    error: isError ? error.message : null,
  }
}
