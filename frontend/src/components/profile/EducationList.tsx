export default function EducationList({
  educations = [],
}: {
  educations?: Array<any>
}) {
  return (
    <div className="space-y-3">
      {educations.map((ed) => (
        <div key={ed.id} className="bg-white rounded shadow p-3">
          <div className="font-medium">
            {ed.school} — {ed.degree}
          </div>
          <div className="text-sm text-gray-500">{ed.fieldOfStudy}</div>
        </div>
      ))}
    </div>
  )
}
