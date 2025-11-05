import React, { useState } from 'react'

type Props = {
  onSend: (text: string) => void
}

export const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t p-2 flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg p-2 text-sm resize-none h-10"
      />
      <button
        onClick={handleSend}
        className="primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  )
}
