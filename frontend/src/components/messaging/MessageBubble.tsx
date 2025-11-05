import React from 'react'

type Props = {
  text: string
  sender: 'me' | 'other'
  time: string
}

export const MessageBubble: React.FC<Props> = ({ text, sender, time }) => {
  const isMe = sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isMe ? 'primary text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm">{text}</p>
        <span className="text-gray-400 text-xs mt-1 block text-right">
          {time}
        </span>
      </div>
    </div>
  )
}
