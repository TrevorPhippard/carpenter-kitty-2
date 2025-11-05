import { useState } from 'react'

export function usePostCardUI() {
  const [showCommentInput, setShowCommentInput] = useState(false)

  function toggleCommentInput() {
    setShowCommentInput((v) => !v)
  }

  return {
    showCommentInput,
    toggleCommentInput,
  }
}
