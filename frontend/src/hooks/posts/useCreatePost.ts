import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Post, PostWithUser } from '@/types/post'
import { createPost } from '@/lib/api'

export interface CreatePostInput {
  text: string
  userId: string
}

interface UseCreatePostOptions {
  currentUser: {
    id: string
    fullName: string
    avatarUrl?: string
  }
}

export function useCreatePost({ currentUser }: UseCreatePostOptions) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,

    // ✅ Optimistic update
    onMutate: async (newPostData) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const prevPosts = queryClient.getQueryData<Array<Post>>(['posts'])

      const optimisticPost: PostWithUser = {
        id: `tmp:${crypto.randomUUID()}`,
        text: newPostData.text ?? '',
        content: newPostData.content ?? '',
        media: newPostData.media ?? [],
        createdAt: new Date(),
        likes: 0,
        userId: currentUser.id,
        // ✅ include user info so PostHeader renders immediately
        user: {
          id: currentUser.id,
          fullName: currentUser.fullName,
          avatarUrl: currentUser.avatarUrl,
        },
        comments: [],
        commentsCount: 0,
      }

      queryClient.setQueryData<Array<Post>>(['posts'], (old = []) => [
        optimisticPost,
        ...old,
      ])

      return { prevPosts }
    },

    onError: (err, _, context) => {
      if (context?.prevPosts) {
        queryClient.setQueryData(['posts'], context.prevPosts)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    createPost: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.error,
  }
}
