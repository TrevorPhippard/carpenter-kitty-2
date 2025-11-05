import { useInfiniteQuery } from '@tanstack/react-query'
import type { Job } from '@/components/jobs/JobsCard'

const fetchJobs = async ({ pageParam = 1 }): Promise<Array<Job>> => {
  // Simulated fetch (replace with actual API call)
  await new Promise((r) => setTimeout(r, 500))

  const jobs: Array<Job> = Array.from({ length: 10 }).map((_, i) => {
    const id = (pageParam - 1) * 10 + i + 1
    return {
      id: `${id}`,
      title: `Freelancer Trade Person ${id}`,
      company: `Company ${id}`,
      location: id % 2 === 0 ? 'Remote' : 'New York, NY',
      timePosted: `${id}d ago`,
      easyApply: id % 3 === 0,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }
  })

  return jobs
}

export function useJobsFeed() {
  return useInfiniteQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  })
}
