import React, { useState } from 'react'

export type Conversation = {
  id: string
  name: string
  lastMessage: string
  unread: boolean
  online?: boolean
  lastActive?: string // new: "2h ago"
}

const sampleConversations: Array<Conversation> = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, are you free today?',
    unread: true,
    online: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Check out this job posting.',
    unread: false,
    online: false,
    lastActive: '2h ago',
  },
  {
    id: '3',
    name: 'Michael Brown',
    lastMessage: 'Can we chat later?',
    unread: true,
    online: true,
  },
]

type Props = {
  onSelect: (id: string) => void
  selectedId: string | null
}

export const ConversationList: React.FC<Props> = ({ onSelect, selectedId }) => {
  const [conversations] = useState(sampleConversations)

  return (
    <div className="w-72 border-r flex flex-col bg-white">
      <div className="p-4 font-semibold text-lg border-b">Messaging</div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
              selectedId === conv.id ? 'bg-gray-200' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {conv.online ? (
                <span className="w-3 h-3 bg-green-500 rounded-full" />
              ) : (
                conv.lastActive && (
                  <span className="text-gray-400 text-xs">
                    {conv.lastActive}
                  </span>
                )
              )}
              <div>
                <p className="font-medium">{conv.name}</p>
                <p className="text-gray-500 text-sm line-clamp-1">
                  {conv.lastMessage}
                </p>
              </div>
            </div>
            {conv.unread && (
              <span className="w-3 h-3 primary rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
