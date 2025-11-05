// frontend/src/lib/db.ts

import { createCollection, useLiveQuery } from '@tanstack/react-db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { QueryClient } from '@tanstack/react-query'
import type { Comment, Post, User } from '@/types/post'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8084'

// ----------------------
// React Query client
// ----------------------
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
})

// ----------------------
// Collections
// ----------------------

// Users collection
export const usersCollection = createCollection<User>({
  name: 'users',
  primaryKey: (u) => u.id,
})

// Posts collection
export const postsCollection = createCollection<Post>({
  name: 'posts',
  primaryKey: (p) => p.id,
})

// Comments collection
export const commentsCollection = createCollection<Comment>({
  name: 'comments',
  primaryKey: (c) => c.id,
})

// ----------------------
// Helpers to load server data into collections
// ----------------------

export async function loadPostsFromServer() {
  const res = await fetch(BASE)

  if (!res.ok) throw new Error('Failed to load posts from server')
  const data: Array<Post> = await res.json()
  console.log({ res: data })

  // Insert into collections
  // We wrap in a pseudo-transaction using local mutate
  data.forEach((post) => {
    // Insert user
    if (post.user) usersCollection.insert(post.user)

    // Insert post
    postsCollection.insert({
      ...post,
      comments: post.comments ?? [],
    })

    // Insert comments
    if (post.comments) {
      post.comments.forEach((comment) => commentsCollection.insert(comment))
    }
  })

  return data
}

// ----------------------
// Optional: helper to create a live query
// ----------------------
export function usePostsLiveQuery() {
  return useLiveQuery(() =>
    postsCollection
      .query()
      .orderBy((p) => new Date(p.createdAt).getTime(), 'desc')
      .all(),
  )
}

export function useCommentsLiveQuery(postId: string) {
  return useLiveQuery(() =>
    commentsCollection
      .query()
      .where((c) => c.postId === postId)
      .orderBy((c) => new Date(c.createdAt).getTime(), 'asc')
      .all(),
  )
}
