import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Comment, Post } from '@/types/post'
import { addComment } from '@/lib/api'

interface UsePostCommentsProps {
  postId: string
  currentUser: {
    id: string
    fullName: string
    avatarUrl?: string
  }
  onCommentAdded?: (c: Comment) => void
}

export function usePostComments({
  postId,
  currentUser,
  onCommentAdded,
}: UsePostCommentsProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (content: string) =>
      addComment(postId, { userId: currentUser.id, content }),

    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const prevPosts = queryClient.getQueryData<Array<Post>>(['posts'])

      if (prevPosts) {
        const tempComment: Comment = {
          id: `tmp:${crypto.randomUUID()}`,
          postId,
          userId: currentUser.id,
          content,
          createdAt: new Date(),
          user: {
            id: currentUser.id,
            fullName: currentUser.fullName,
            avatarUrl: currentUser.avatarUrl,
          },
        }

        queryClient.setQueryData<Array<Post>>(['posts'], (old = []) =>
          old.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [tempComment, ...(post.comments ?? [])],
                  commentsCount: (post.commentsCount ?? 0) + 1,
                }
              : post,
          ),
        )

        onCommentAdded?.(tempComment)
      }

      return { prevPosts }
    },

    onError: (err, _, context) => {
      if (context?.prevPosts) {
        queryClient.setQueryData(['posts'], context.prevPosts)
      }
      console.error('Failed to add comment:', err)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    addComment: mutation.mutate,
    isAdding: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}
