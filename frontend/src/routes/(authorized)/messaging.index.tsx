import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChatWindow } from '@/components/messaging/ChatWindow'
import { ConversationList } from '@/components/messaging/ConversationList'

export const Route = createFileRoute('/(authorized)/messaging/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >('1')

  return (
    <div className="flex h-full gap-4 p-4">
      <ConversationList
        selectedId={selectedConversation}
        onSelect={setSelectedConversation}
      />
      {selectedConversation ? (
        <div className="flex-1">
          <ChatWindow conversationId={selectedConversation} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  )
}
