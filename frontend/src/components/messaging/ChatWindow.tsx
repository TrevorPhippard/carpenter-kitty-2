import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'

export type Message = {
  id: string
  sender: 'me' | 'other'
  text: string
  time: string
  seen?: boolean // new
}

type Props = {
  conversationId: string
}

export const ChatWindow: React.FC<Props> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Array<Message>>([
    { id: '1', sender: 'other', text: 'Hi! How are you?', time: '10:00 AM' },
    {
      id: '2',
      sender: 'me',
      text: 'I am good, thanks! How about you?',
      time: '10:01 AM',
      seen: true,
    },
  ])
  const [hasMore, setHasMore] = useState(true)
  const [newMessageArrived, setNewMessageArrived] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const topRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    setNewMessageArrived(false)
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversationId])

  const loadOlderMessages = useCallback(() => {
    if (!hasMore) return
    const older: Array<Message> = [
      {
        id: `${messages.length + 1}`,
        sender: 'other',
        text: 'Older message example 1',
        time: '9:55 AM',
      },
      {
        id: `${messages.length + 2}`,
        sender: 'me',
        text: 'Older message example 2',
        time: '9:56 AM',
      },
    ]
    setMessages((prev) => [...older, ...prev])
    setHasMore(false)
  }, [hasMore, messages.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadOlderMessages()
      },
      { root: scrollRef.current, threshold: 0.1 },
    )

    if (topRef.current) observer.observe(topRef.current)
    return () => {
      if (topRef.current) observer.unobserve(topRef.current)
    }
  }, [loadOlderMessages])

  // Simulate incoming messages
  // Extracted function to reduce nesting
  const handleIncomingMessage = () => {
    const newMsg: Message = {
      id: `${Date.now()}`,
      sender: 'other',
      text: 'New incoming message!',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    setMessages((prev) => [...prev, newMsg])
    setIsTyping(false)

    if (scrollRef.current) {
      const nearBottom =
        scrollRef.current.scrollHeight -
          scrollRef.current.scrollTop -
          scrollRef.current.clientHeight <
        50
      if (!nearBottom) setNewMessageArrived(true)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(handleIncomingMessage, 1500)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Helper function to mark a message as seen
  const markMessageAsSeen = (
    messages: Array<Message>,
    messageId: string,
  ): Array<Message> => {
    return messages.map((msg) =>
      msg.id === messageId ? { ...msg, seen: true } : msg,
    )
  }

  const handleSend = (text: string) => {
    const newMsg: Message = {
      id: `${Date.now()}`,
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      seen: false, // initially not seen
    }
    setMessages((prev) => [...prev, newMsg])
    scrollToBottom()

    // Simulate the other user seeing the message after a delay
    setTimeout(() => {
      setMessages((prev) => markMessageAsSeen(prev, newMsg.id))
    }, 5000)
  }

  return (
    <div className="flex flex-col flex-1 border rounded-lg overflow-hidden relative">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-white"
      >
        <div ref={topRef}></div>
        {messages.map((msg, idx) => (
          <div key={msg.id} className="relative">
            <MessageBubble {...msg} />
            {/* Seen receipt */}
            {msg.sender === 'me' && msg.seen && idx === messages.length - 1 && (
              <span className="absolute -bottom-3 right-0 text-xs text-gray-400">
                Seen
              </span>
            )}
          </div>
        ))}
      </div>

      {isTyping && (
        <div className="absolute bottom-16 left-4 text-gray-500 text-sm italic">
          John is typing...
        </div>
      )}

      {newMessageArrived && !isTyping && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-10"
        >
          New Message
        </button>
      )}

      <MessageInput onSend={handleSend} />
    </div>
  )
}
