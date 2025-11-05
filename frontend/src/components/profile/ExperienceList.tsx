export default function ExperienceList({
  experiences = [],
}: {
  experiences?: Array<any>
}) {
  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div key={exp.id} className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">
                {exp.title} — {exp.company}
              </h4>
              <div className="text-sm text-gray-500">
                {new Date(exp.startDate).toLocaleDateString()} -{' '}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : 'Present'}
              </div>
              <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
