import { Derived, Store } from '@tanstack/store'
import { mockUser } from '@/data/mockData'

export const store = new Store({
  userId: mockUser.id,
  fullName: mockUser.fullName,
  avatarUrl: mockUser.avatarUrl,
})

export const fullName = new Derived({
  fn: () => `${store.state.fullName}`,
  deps: [store],
})

fullName.mount()
