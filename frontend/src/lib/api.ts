import type { ClientProfile, ContractorProfile } from '@/types/user'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

async function parseRes(res: Response) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

// POSTS

export async function getPosts() {
  const res = await fetch(`${BASE}/api/posts`)
  if (!res.ok) throw new Error((await parseRes(res)) || 'Failed to fetch posts')
  return res.json()
}

export async function addComment(
  postId: string,
  payload: {
    userId: string
    content: string
  },
) {
  const res = await fetch(`${BASE}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error((await parseRes(res)) || 'Failed to add comment')
  return res.json()
}

export async function createPost(payload: {
  userId: string
  text?: string
  content?: string
  media?: Array<string>
}) {
  const res = await fetch(`${BASE}/api/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error((await parseRes(res)) || 'Failed to create post')
  return res.json()
}

export async function getCurrentUser() {
  const res = await fetch(`${BASE}/api/me`)
  if (!res.ok) throw new Error('Failed to fetch current user')
  return res.json()
}

// NETWORK

export async function getConnections(userId: string) {
  const res = await fetch(`${BASE}/api/network/connections/${userId}`)
  if (!res.ok) throw new Error(await parseRes(res))
  return res.json()
}

export async function getInvitations(userId: string) {
  const res = await fetch(`${BASE}/api/network/invitations/${userId}`)
  if (!res.ok) throw new Error(await parseRes(res))
  return res.json()
}

export async function getSuggestions(userId: string) {
  const res = await fetch(`${BASE}/api/network/suggestions/${userId}`)
  if (!res.ok) throw new Error(await parseRes(res))
  return res.json()
}

export async function sendInvite(userId: string) {
  const res = await fetch(`${BASE}/api/network/invite/${userId}`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(await parseRes(res))
  return res.json()
}

export async function acceptInvite(inviteId: string) {
  const res = await fetch(`${BASE}/api/network/accept/${inviteId}`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(await parseRes(res))
  return res.json()
}

export async function declineInvite(inviteId: string) {
  const res = await fetch(`${BASE}/api/network/decline/${inviteId}`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(await parseRes(res))
  return res.json()
}

export async function fetchProfile(username: string) {
  const res = await fetch(`${BASE}/api/profiles/${username}`)
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}
