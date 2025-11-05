import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  acceptInvite,
  declineInvite,
  getConnections,
  getInvitations,
  getSuggestions,
  sendInvite,
} from '@/lib/api'
import { useUser } from '@/integrations/tanstack-query/UserProvider'

// --------------------- Connections ---------------------
export function useConnections() {
  const { user } = useUser() // <-- get current user
  const userId = String(user?.id)
  return useQuery({
    queryKey: ['network', 'connections', userId],
    queryFn: () => getConnections(userId),
    enabled: !!userId, // don't run if no userId
  })
}

// --------------------- Invitations ---------------------
export function useInvitations() {
  const { user } = useUser() // <-- get current user
  const userId = String(user?.id)
  return useQuery({
    queryKey: ['network', 'invitations', userId],
    queryFn: () => getInvitations(userId),
    enabled: !!userId,
  })
}

// --------------------- Suggestions ---------------------
export function useSuggestions() {
  const { user } = useUser() // <-- get current user
  const userId = String(user?.id)
  return useQuery({
    queryKey: ['network', 'suggestions', userId],
    queryFn: () => getSuggestions(userId),
    enabled: !!userId,
  })
}

// Mutations
export function useSendInvite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: sendInvite,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['network', 'suggestions'] })
      qc.invalidateQueries({ queryKey: ['network', 'invitations'] })
    },
  })
}

export function useAcceptInvite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: acceptInvite,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['network', 'connections'] })
      qc.invalidateQueries({ queryKey: ['network', 'invitations'] })
    },
  })
}

export function useDeclineInvite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: declineInvite,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['network', 'invitations'] })
    },
  })
}
