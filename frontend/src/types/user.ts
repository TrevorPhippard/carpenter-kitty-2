// -----------------------------------------
// Core Shared Types

import { ReactNode } from 'react'

// -----------------------------------------
export type ID = string
export type Timestamp = Date

export type Availability = 'available' | 'busy' | 'on_vacation'
export type Role = 'freelancer' | 'client' | 'admin'
export type SkillLevel = 'beginner' | 'intermediate' | 'expert'
export type ConnectionStatus = 'pending' | 'accepted' | 'blocked'
export type NotificationType =
  | 'message'
  | 'review'
  | 'endorsement'
  | 'connection_request'
  | 'connection_accepted'
  | 'system'
export type Currency = string
export type ProfileVisibility = 'public' | 'connections' | 'private'
export type MessageAccess = 'anyone' | 'connections' | 'clients_only'
export type PayoutMethod = 'stripe' | 'paypal' | 'manual'

// -----------------------------------------
// Base Entities
// -----------------------------------------
export interface BaseEntity {
  id: ID
  userId: ID
}

export interface Timestamped {
  createdAt: Timestamp
  updatedAt?: Timestamp
}

// -----------------------------------------
// Sub-Entities (Reused Across Profiles)
// -----------------------------------------
export interface Experience extends BaseEntity {
  title: string
  company: string
  startDate: string
  endDate?: string
  description?: string
  technologies?: Array<string>
  achievements?: Array<string>
}

export interface Education extends BaseEntity {
  school: string
  degree: string
  fieldOfStudy?: string
  startDate: string
  endDate?: string
}

export interface Certification extends BaseEntity {
  name: string
  organization: string
  issueDate: string
  expiryDate?: string
  credentialUrl?: string
}

export interface Skill extends BaseEntity {
  name: string
  level: SkillLevel
  endorsements: number
}

export interface PortfolioItem extends BaseEntity {
  title: string
  description?: string
  projectUrl?: string
  imageUrls?: Array<string>
  tags?: Array<string>
  createdAt: Timestamp
}

export interface Review extends BaseEntity {
  reviewerId: ID
  recipientId: ID
  rating: number
  text: string
  projectId?: ID
  createdAt: Timestamp
}

export interface SocialLinks {
  linkedin?: string
  github?: string
  portfolio?: string
  twitter?: string
}

// -----------------------------------------
// User and Base Profile
// -----------------------------------------
export interface User extends Timestamped {
  title: ReactNode
  fullName: ReactNode
  id: ID
  email: string
  passwordHash: string
  username: string
  role: Role
  lastLoginAt?: Timestamp
}

// -----------------------------------------
// Generic Profile Composition System
// -----------------------------------------

// Define keys for all possible profile modules
export interface ProfileModules {
  skills: Array<Skill>
  portfolioItems: Array<PortfolioItem>
  experiences: Array<Experience>
  education: Array<Education>
  certifications: Array<Certification>
  reviews: Array<Review>
  socialLinks: SocialLinks
}

// Define which modules are included dynamically

/** https://www.youtube.com/watch?v=gieEQFIfgYc. around the 3:27:00 mark
 * will help explain what I'm trying to do here with the ProfileWith type.
 *
 * AI Generated Explanation:
 * The ProfileWith type is a generic type that allows for the dynamic composition of user profile types based on selected modules.
 * M is a generic type parameter that extends a partial record of the keys of ProfileModules to boolean values.
 * This means M can have any subset of the keys from ProfileModules, each mapped to a boolean indicating inclusion.
 * The main ProfileWith type combines the base profile fields with the selected modules.
 * For each key K in ProfileModules, if M[K] is true, that module is included in the resulting type; otherwise, it is omitted.
 * This allows for flexible composition of profile types based on the specified modules.
 *  For example, ProfileWith<{ skills: true, experiences: true }> would include only the skills and experiences modules along with the base profile fields.
 * This approach provides a powerful way to create tailored profile types while maintaining type safety and clarity.
 *  The predefined profile shapes (MinimalProfile, ProfileWithSkills, FullProfile, ClientProfile, ContractorProfile) demonstrate how to use the ProfileWith type to create specific profile configurations.
 *  This system allows for easy expansion and modification of profile structures as needed.
 *  The ClientProfile and ContractorProfile types further specialize the ProfileWith type by adding a role field, ensuring that profiles for clients and contractors have the appropriate structure and included modules.
 *  This design pattern is particularly useful in applications where user profiles can vary significantly based on their roles or the features they utilize, allowing for a clean and maintainable codebase.
 *
 */
export type ProfileWith<
  M extends Partial<Record<keyof ProfileModules, boolean>> = {},
> = {
  id: ID
  userId: ID
  fullName: string
  title: string
  bio: string
  avatarUrl?: string
  bannerUrl?: string
  location?: string
  timezone?: string
  hourlyRate?: number
  availability: Availability
  industries: Array<string>
  website?: string
  reputationScore: number
} & {
  [K in keyof ProfileModules as M[K] extends true
    ? K
    : never]: ProfileModules[K]
}

// Example predefined profile shapes:
export type MinimalProfile = ProfileWith<{}> // Basic info only
export type ProfileWithSkills = ProfileWith<{ skills: true }>
export type FullProfile = ProfileWith<{
  skills: true
  portfolioItems: true
  experiences: true
  education: true
  certifications: true
  reviews: true
  socialLinks: true
}>

// -----------------------------------------
// Specialized Variants (Client / Contractor)
// -----------------------------------------
export type ClientProfile = ProfileWith<{
  skills: true
  experiences: true
  education: true
  reviews: true
  portfolioItems: true
}> & { role: 'client' }

export type ContractorProfile = ProfileWith<{
  skills: true
  experiences: true
  education: true
  reviews: true
  portfolioItems: true
  certifications: true
}> & { role: 'freelancer' }

// -----------------------------------------
// Social & Communication
// -----------------------------------------
export interface Message extends BaseEntity {
  senderId: ID
  receiverId: ID
  content: string
  read: boolean
  createdAt: Timestamp
}

export interface Connection {
  id: ID
  followerId: ID
  followingId: ID
  status: ConnectionStatus
  createdAt: Timestamp
}

export interface Notification {
  id: ID
  userId: ID
  type: NotificationType
  content: string
  link?: string
  read: boolean
  createdAt: Timestamp
}

// -----------------------------------------
// Settings & Payments
// -----------------------------------------
export interface PaymentAccount extends BaseEntity {
  stripeCustomerId?: string
  paypalEmail?: string
  payoutMethod: PayoutMethod
  currency: Currency
  taxInfo?: {
    country: string
    taxId?: string
  }
}

export interface Setting extends BaseEntity {
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
  }
  privacy: {
    profileVisibility: ProfileVisibility
    showHourlyRate: boolean
    allowMessagesFrom: MessageAccess
  }
}
