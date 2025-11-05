import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Comment, Post } from '@/types/post'
import { addComment } from '@/lib/api'

interface AddCommentPayload {
  postId: string
  userId: string
  content: string
}

export function useAddComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, userId, content }: AddCommentPayload) =>
      addComment(postId, { userId, content }),

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const prevPosts = queryClient.getQueryData<Array<Post>>(['posts'])

      if (prevPosts) {
        queryClient.setQueryData<Array<Post>>(['posts'], (old = []) =>
          old.map((post) =>
            post.id === newComment.postId
              ? {
                  ...post,
                  comments: [
                    {
                      id: 'temp-' + Math.random().toString(36).slice(2),
                      postId: newComment.postId,
                      content: newComment.content,
                      userId: newComment.userId,
                      createdAt: new Date(),
                    } as Comment,
                    ...((post as Post & { comments?: Array<Comment> })
                      .comments ?? []),
                  ],
                  commentsCount: post.commentsCount + 1,
                }
              : post,
          ),
        )
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
}
