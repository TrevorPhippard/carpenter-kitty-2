export default function SkillsList({ skills = [] }: { skills?: Array<any> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span key={s.id} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
          {s.name} • {s.level}
        </span>
      ))}
    </div>
  )
}
