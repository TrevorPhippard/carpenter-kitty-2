import type { ProfileWith } from '@/types/user'
import { CreatePostBox } from '@/components/feed/CreatePostBox'
import { PostCard } from '@/components/ui/Postcard/PostCard'
import { FeedSkeleton } from '@/components/feed/FeedSkeleton'
import { usePosts } from '@/hooks/posts/usePosts'
import { useAddComment } from '@/hooks/posts/useAddComment'

export function Feed({ currentUser }: { currentUser?: ProfileWith }) {
  const { posts, loading, error } = usePosts()
  const { mutate: addComment, isPending } = useAddComment()

  if (loading) return <FeedSkeleton />
  if (error) {
    return <div className="text-red-600">Error loading posts: {error}</div>
  }

  if (!posts?.results.length) {
    return <div className="text-gray-500">No posts available</div>
  }

  return (
    <>
      {currentUser && <CreatePostBox user={currentUser} />}
      {posts.results.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          onCommentAdded={(commentContent: string) => {
            if (!currentUser)
              return addComment({
                postId: post.id,
                userId: currentUser.id,
                content: commentContent,
              })
          }}
        />
      ))}
    </>
  )
}
