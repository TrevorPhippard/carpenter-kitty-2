import { faker } from '@faker-js/faker'
import type { M } from 'node_modules/framer-motion/dist/types.d-BJcRxCew'
import type {
  Certification,
  Education,
  Experience,
  PortfolioItem,
  ProfileWith,
  Review,
  Skill,
  SocialLinks,
} from '@/types/user'

// -----------------------------------------
// Helpers for individual sub-entities
// -----------------------------------------
const makeSkill = (userId: string): Skill => ({
  id: faker.string.uuid(),
  userId,
  name: faker.hacker.ingverb(),
  level: faker.helpers.arrayElement(['beginner', 'intermediate', 'expert']),
  endorsements: faker.number.int({ min: 0, max: 100 }),
})

const makePortfolioItem = (userId: string): PortfolioItem => ({
  id: faker.string.uuid(),
  userId,
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  projectUrl: faker.internet.url(),
  imageUrls: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
    faker.image.urlLoremFlickr({ category: 'work' }),
  ),
  tags: faker.helpers.arrayElements(['React', 'Vue', 'Node', 'Go', 'Design'], {
    min: 1,
    max: 3,
  }),
  createdAt: faker.date.recent({ days: 30 }),
})

const makeExperience = (userId: string): Experience => ({
  id: faker.string.uuid(),
  userId,
  title: faker.person.jobTitle(),
  company: faker.company.name(),
  startDate: faker.date.past({ years: 2 }).toISOString(),
  endDate: faker.helpers.maybe(() => faker.date.recent().toISOString(), {
    probability: 0.5,
  }),
  description: faker.lorem.sentences(2),
  technologies: faker.helpers.arrayElements(
    ['React', 'Vue', 'Go', 'TypeScript', 'GraphQL'],
    { min: 1, max: 4 },
  ),
  achievements: faker.helpers.arrayElements(
    ['Improved performance', 'Led a small team', 'Delivered ahead of schedule'],
    { min: 1, max: 2 },
  ),
})

const makeEducation = (userId: string): Education => ({
  id: faker.string.uuid(),
  userId,
  school: faker.company.name() + ' University',
  degree: faker.helpers.arrayElement(['BSc', 'MSc', 'Diploma']),
  fieldOfStudy: faker.helpers.arrayElement([
    'Computer Science',
    'Design',
    'Marketing',
  ]),
  startDate: faker.date.past({ years: 6 }).toISOString(),
  endDate: faker.date.past({ years: 2 }).toISOString(),
})

const makeCertification = (userId: string): Certification => ({
  id: faker.string.uuid(),
  userId,
  name: faker.helpers.arrayElement([
    'AWS Certified',
    'Google Cloud Professional',
    'Scrum Master',
  ]),
  organization: faker.company.name(),
  issueDate: faker.date.past({ years: 3 }).toISOString(),
  expiryDate: faker.helpers.maybe(() => faker.date.future().toISOString(), {
    probability: 0.3,
  }),
  credentialUrl: faker.internet.url(),
})

const makeReview = (userId: string): Review => ({
  id: faker.string.uuid(),
  userId,
  reviewerId: faker.string.uuid(),
  recipientId: userId,
  rating: faker.number.int({ min: 1, max: 5 }),
  text: faker.lorem.sentences(2),
  projectId: faker.helpers.maybe(() => faker.string.uuid(), {
    probability: 0.3,
  }),
  createdAt: faker.date.recent({ days: 90 }),
})

const makeSocialLinks = (): SocialLinks => ({
  linkedin: faker.internet.url(),
  github: faker.internet.url(),
  portfolio: faker.internet.url(),
  twitter: faker.internet.url(),
})

// -----------------------------------------
// Dynamic generator for any ProfileWith<>
// -----------------------------------------
export function createProfile<
  TModules extends Partial<Record<keyof ProfileWith<any>, boolean>>,
>(modules?: TModules): ProfileWith<TModules> {
  const userId = faker.string.uuid()

  const base = {
    id: faker.string.uuid(),
    userId,
    fullName: faker.person.fullName(),
    title: faker.person.jobTitle(),
    bio: faker.lorem.paragraph(),
    avatarUrl: faker.image.avatar(),
    bannerUrl: faker.image.urlLoremFlickr({ category: 'abstract' }),
    location: faker.location.city(),
    timezone: faker.location.timeZone(),
    hourlyRate: faker.number.int({ min: 25, max: 150 }),
    availability: faker.helpers.arrayElement([
      'available',
      'busy',
      'on_vacation',
    ]),
    industries: faker.helpers.arrayElements(
      ['Design', 'Development', 'Marketing', 'Finance', 'IT'],
      { min: 1, max: 3 },
    ),
    website: faker.internet.url(),
    reputationScore: faker.number.float({
      min: 3.0,
      max: 5.0,
      precision: 0.01,
    }),
  }

  return {
    ...base,
    ...(modules?.skills && {
      skills: faker.helpers.multiple(() => makeSkill(userId), { count: 4 }),
    }),
    ...(modules?.portfolioItems && {
      portfolioItems: faker.helpers.multiple(() => makePortfolioItem(userId), {
        count: 3,
      }),
    }),
    ...(modules?.experiences && {
      experiences: faker.helpers.multiple(() => makeExperience(userId), {
        count: 2,
      }),
    }),
    ...(modules?.education && {
      education: faker.helpers.multiple(() => makeEducation(userId), {
        count: 2,
      }),
    }),
    ...(modules?.certifications && {
      certifications: faker.helpers.multiple(() => makeCertification(userId), {
        count: 2,
      }),
    }),
    ...(modules?.reviews && {
      reviews: faker.helpers.multiple(() => makeReview(userId), { count: 3 }),
    }),
    ...(modules?.socialLinks && { socialLinks: makeSocialLinks() }),
  } as ProfileWith<M>
}
