// frontend/src/components/ui/Postcard/CommentInput.tsx
import { useState } from 'react'
import Avatar from '@/components/Avatar'
import { Button } from '@/components/ui/button'

export function CommentInput({
  currentUser,
  onSubmit,
}: Readonly<{
  currentUser: {
    avatarUrl: string
    fullName: string
  }
  onSubmit: (text: string) => void
}>) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const t = text.trim()
    if (!t) return
    setLoading(true)
    try {
      onSubmit(t)
      setText('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 border-t bg-gray-50">
      <Avatar user={currentUser} alt={currentUser.fullName} />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="Add a comment..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button onClick={submit} disabled={!text.trim() || loading}>
        {loading ? 'Posting...' : 'Post'}
      </Button>
    </div>
  )
}
