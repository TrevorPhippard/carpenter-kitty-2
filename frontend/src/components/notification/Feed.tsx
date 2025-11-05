import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components//ui/button'

type Notification = {
  id: string
  text: string
  time: string
  type: 'all' | 'mention' | 'connection'
  read?: boolean
  link?: string
}

// Sample random notifications to simulate new ones
const sampleNotifications: Array<Omit<Notification, 'id'>> = [
  { text: 'Alice liked your post.', time: 'Just now', type: 'all' },
  {
    text: 'Bob mentioned you in a comment.',
    time: 'Just now',
    type: 'mention',
  },
  {
    text: 'Charlie sent you a connection request.',
    time: 'Just now',
    type: 'connection',
  },
  { text: 'Diana commented on your post.', time: 'Just now', type: 'all' },
]

const initialNotifications: Array<Notification> = [
  {
    id: '1',
    text: 'John Doe liked your post.',
    time: '2h ago',
    type: 'all',
    read: false,
    link: '/dashboard/feed',
  },
  {
    id: '2',
    text: 'Jane Smith mentioned you in a comment.',
    time: '5h ago',
    type: 'mention',
    read: false,
  },
  {
    id: '3',
    text: 'Michael Brown sent you a connection request.',
    time: '1d ago',
    type: 'connection',
    read: false,
  },
]

const tabs: Array<{ label: string; value: 'all' | 'mention' | 'connection' }> =
  [
    { label: 'All', value: 'all' },
    { label: 'Mentions', value: 'mention' },
    { label: 'Connections', value: 'connection' },
  ]

export const NotificationsFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mention' | 'connection'>(
    'all',
  )
  const [notifications, setNotifications] =
    useState<Array<Notification>>(initialNotifications)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Simulate new notifications at random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * sampleNotifications.length)
      const sample = sampleNotifications[randomIndex]
      const newNotif: Notification = {
        ...sample,
        id: `${Date.now()}`, // simple unique id
        read: false,
      }
      setNotifications((prev) => [newNotif, ...prev])
    }, 5000) // every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const handleClick = (id: string, link?: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    )
    if (link) window.location.href = link
  }

  const filteredNotifications = notifications.filter(
    (notif) => activeTab === 'all' || notif.type === activeTab,
  )

  const loadMoreNotifications = useCallback(() => {
    if (!hasMore) return

    const olderNotifs: Array<Notification> = [
      {
        id: `${notifications.length + 1}`,
        text: 'Old notification example 1.',
        time: '7d ago',
        type: 'all',
        read: false,
      },
      {
        id: `${notifications.length + 2}`,
        text: 'Old notification example 2.',
        time: '8d ago',
        type: 'mention',
        read: false,
      },
    ]

    setNotifications((prev) => [...prev, ...olderNotifs])
    setHasMore(false) // only load one extra batch for demo
  }, [hasMore, notifications.length])

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreNotifications()
      },
      { rootMargin: '200px' },
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [loadMoreNotifications])

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex gap-2">
          <Button
            onClick={markAllAsRead}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
          >
            Mark All as Read
          </Button>
          <div className="relative">
            <Button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 -mb-px font-medium border-b-2 ${
              activeTab === tab.value
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleClick(notif.id, notif.link)}
              className={`p-3 rounded cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                notif.read ? 'bg-gray-50 font-normal' : 'bg-white font-semibold'
              }`}
            >
              {!notif.read && (
                <span className="w-2 h-2 primary rounded-full"></span>
              )}
              <div>
                <p>{notif.text}</p>
                <span className="text-gray-400 text-sm">{notif.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Infinite scroll loader */}
        {hasMore && <div ref={loaderRef} className="h-4"></div>}
      </div>
    </div>
  )
}
