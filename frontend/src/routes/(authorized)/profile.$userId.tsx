import { createFileRoute } from '@tanstack/react-router'
import { useProfile } from '@/hooks/useProfile'
import ProfileHeader from '@/components/profile/ProfileHeader'
import SkillsList from '@/components/profile/SkillsList'
import PortfolioGrid from '@/components/profile/PortfolioGrid'
import ExperienceList from '@/components/profile/ExperienceList'
import EducationList from '@/components/profile/EducationList'
import ReviewsList from '@/components/profile/ReviewsList'
import { fetchProfile } from '@/lib/api'
import { safeLoaderWithFallback } from '@/lib/safeLoaderWithFallback'
import { mockProfileResponse } from '@/data/mockData'

export const Route = createFileRoute('/(authorized)/profile/$userId')({
  component: RouteComponent,
  loader: safeLoaderWithFallback(
    async ({ params }) => {
      const { userId } = params
      if (!userId) return null
      return fetchProfile(userId)
    },
    () => mockProfileResponse,
  ),
})

function RouteComponent() {
  const { profile, isLoading, isOwner } = useProfile()

  if (isLoading) return <div className="p-6">Loading...</div>
  if (!profile) return <div className="p-6">Profile not found</div>

  return (
    <div className="p-6 space-y-6">
      <ProfileHeader profile={profile.user} isOwner={false} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded shadow p-6">
            <h3 className="font-semibold">About</h3>
            <p className="mt-2 text-sm text-gray-700">{profile.bio}</p>
            <div className="mt-4">
              <h4 className="font-medium">Skills</h4>
              <div className="mt-2">
                <SkillsList skills={profile.profile.skills} />
              </div>
            </div>
          </section>

          <section className="bg-white rounded shadow p-6">
            <h3 className="font-semibold">Portfolio</h3>
            <div className="mt-4">
              <PortfolioGrid items={profile.profile.portfolioItems} />
            </div>
          </section>

          <section className="bg-white rounded shadow p-6">
            <h3 className="font-semibold">Experience</h3>
            <div className="mt-4">
              <ExperienceList experiences={profile.profile.experiences} />
            </div>
          </section>

          <section className="bg-white rounded shadow p-6">
            <h3 className="font-semibold">Education</h3>
            <div className="mt-3">
              <EducationList educations={profile.profile.education} />
            </div>
          </section>

          <section className="bg-white rounded shadow p-6">
            <h3 className="font-semibold">Reviews</h3>
            <div className="mt-3">
              <ReviewsList reviews={profile.profile.reviews} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <h2 className="text-1xl font-bold">Recent Posts</h2>
        </aside>
      </div>
    </div>
  )
}
