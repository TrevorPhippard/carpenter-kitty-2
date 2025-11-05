import { useState } from 'react'
import { ActionIcon } from '../ActionIcon'
import type { ProfileWith } from '../../types/user'
import { useCreatePost } from '@/hooks/posts/useCreatePost'
import { Button } from '@/components//ui/button'

export function CreatePostBox({ user }: { user: ProfileWith }) {
  const [text, setText] = useState('')
  const { createPost, isCreating } = useCreatePost({ currentUser: user })

  const handleSubmit = () => {
    if (!text.trim()) return
    createPost({ text, userId: user.id })
    setText('')
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-start gap-4">
        <img
          src={user.avatarUrl}
          alt="me"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            placeholder="Start a post"
            className="w-full resize-none border border-gray-200 rounded p-3 text-sm min-h-[64px] focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isCreating}
          />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {/* <ActionIcon label="Photo" /> */}
              {/* <ActionIcon label="Video" /> */}
              {/* <ActionIcon label="Event" /> */}
              {/* <ActionIcon label="Write article" /> */}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isCreating || !text.trim()}
              className={`px-4 py-1 rounded text-sm transition ${
                isCreating || !text.trim()
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-primary hover:brightness-95 text-white cursor-pointer'
              }`}
            >
              {isCreating ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
