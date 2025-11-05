import { faker } from '@faker-js/faker'
import type {
  Comment,
  Post,
  PostWithComments,
  PostWithUser,
} from '@/types/post'

const makeComment = (postId: string): Comment => {
  const userId = faker.string.uuid()
  return {
    id: faker.string.uuid(),
    postId,
    userId,
    content: faker.lorem.sentence(),
    createdAt: faker.date.recent({ days: 14 }),
    user: {
      id: userId,
      fullName: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
    },
  }
}

// Basic post factory
export const makePost = (userId?: string): Post => {
  const id = faker.string.uuid()
  return {
    id,
    userId: userId || faker.string.uuid(),
    text: faker.lorem.sentence(), // short post text or title
    content: faker.lorem.paragraphs({ min: 1, max: 2 }), // main body
    media: faker.helpers.maybe(() =>
      Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        faker.image.urlPicsumPhotos(),
      ),
    ),
    likes: faker.number.int({ min: 0, max: 1000 }),
    commentsCount: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.recent({ days: 30 }),
    updatedAt: faker.helpers.maybe(() => faker.date.recent({ days: 5 })),
  }
}

export const makePostWithUser = (): PostWithUser => {
  const post = makePost()
  return {
    ...post,
    user: {
      id: post.userId,
      fullName: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      title: faker.person.jobTitle(),
    },
  }
}

export const makePostWithComments = (): PostWithComments => {
  const post = makePost()
  const count = faker.number.int({ min: 0, max: 6 })
  return {
    ...post,
    comments: Array.from({ length: count }, () => makeComment(post.id)),
  }
}

export const makePosts = (count = 10): Array<Post> =>
  Array.from({ length: count }, () => makePost())

export const makePostsWithUsers = (count = 10): Array<PostWithUser> =>
  Array.from({ length: count }, () => makePostWithUser())

export const makePostsWithComments = (count = 5): Array<PostWithComments> =>
  Array.from({ length: count }, () => makePostWithComments())

// import { makePostsWithComments, makePostsWithUsers } from '@/data/postFactory'
// const mockPosts = [
// ...makePostsWithUsers(10),
// ...makePostsWithComments(5)].sort(
//   () => Math.random() - 0.5,
// )
