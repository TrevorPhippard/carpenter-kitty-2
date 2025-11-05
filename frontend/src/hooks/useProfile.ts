import { useQuery } from '@tanstack/react-query'
import { useMatch } from '@tanstack/react-router'
import type { ClientProfile, ContractorProfile } from '@/types/user'
import { Route } from '@/routes/(authorized)/profile.$userId'
import { useAuth } from '@/hooks/useAuth'
import { fetchProfile } from '@/lib/api'
// import { fetchProfile } from '@/lib/api'

export function useProfile(): {
  profile?: any
  isLoading: boolean
  isOwner: boolean
} {
  const match = useMatch({ from: Route.id })
  const { userId } = match.params
  const loaderData = match.loaderData // preloaded profile from loader

  const { user } = useAuth()

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId),
    initialData: loaderData,
    enabled: !!userId,
    retry: false, // don’t retry on failure
  })

  const isOwner = user.username === userId

  return { profile, isLoading, isOwner }
}
