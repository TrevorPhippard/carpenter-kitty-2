import { createProfile } from './profileFactory'
import type { Role, User } from '../types/user'

const mockUser = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser@example.com',
  passwordHash: 'hashedpassword',
  username: 'mockuser',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockUser1 = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser1@example.com',
  passwordHash: 'hashedpassword1',
  username: 'mockuser1',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockUser2 = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser1@example.com',
  passwordHash: 'hashedpassword1',
  username: 'mockuser1',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockUser3 = {
  ...createProfile({
    skills: true,
    portfolioItems: true,
    experiences: true,
    education: true,
    certifications: true,
    reviews: true,
    socialLinks: true,
  }),

  email: 'mockuser1@example.com',
  passwordHash: 'hashedpassword1',
  username: 'mockuser1',
  role: 'user' as Role,
  createdAt: new Date(),
}

const mockProfileResponse = {
  user: {
    id: '',
    fullName: '',
    avatarUrl: '',
    title: '',
    createdAt: '',
    profile: {
      bio: '',
      location: '',
      website: '',
      coverUrl: '',
      skills: [],
      data: { pronouns: '', lookingFor: '' },
    },
  },
  profile: {
    bio: '',
    location: '',
    website: '',
    coverUrl: '',
    skills: [],
    data: { pronouns: '', lookingFor: '' },
  },
  posts: [
    {
      id: '',
      userId: '',
      text: '',
      content: '',
      media: [],
      likes: 0,
      createdAt: '',
      updatedAt: null,
    },
  ],
  postsCount: 0,
  connectionsCount: 0,
}

// console.log(mockUser)
const suggestions: Array<User> = [mockUser1, mockUser2, mockUser3]

export { suggestions, mockUser, mockProfileResponse }
